import { beforeEach, describe, expect, it, vi } from 'vitest';

const qstashMock = vi.hoisted(() => ({ verify: vi.fn() }));
const scheduledMock = vi.hoisted(() => ({
  claimScheduledJobRun: vi.fn(),
  completeScheduledJobRun: vi.fn(),
  failScheduledJobRun: vi.fn(),
  runScheduledJobTask: vi.fn(),
}));

class TestSignatureError extends Error {
  constructor(message = 'invalid signature') {
    super(message);
    this.name = 'SignatureError';
  }
}

vi.mock('@upstash/qstash', () => ({
  SignatureError: TestSignatureError,
  Receiver: class {
    verify(input: unknown) {
      return qstashMock.verify(input);
    }
  },
}));

vi.mock('@/lib/media/config', async (importOriginal) => {
  const original = await importOriginal<typeof import('@/lib/media/config')>();
  return {
    ...original,
    getQStashMediaConfig: () => ({
      token: 'token',
      currentSigningKey: 'current',
      nextSigningKey: 'next',
    }),
  };
});

vi.mock('@/lib/prisma', () => ({ prisma: { scheduled: true } }));
vi.mock('@/lib/scheduled-jobs', () => ({
  claimScheduledJobRun: scheduledMock.claimScheduledJobRun,
  completeScheduledJobRun: scheduledMock.completeScheduledJobRun,
  failScheduledJobRun: scheduledMock.failScheduledJobRun,
  parseScheduledJobTask: (value: unknown) => (
    value === 'daily-maintenance-full' || value === 'cleanup-images' ? value : null
  ),
  runScheduledJobTask: scheduledMock.runScheduledJobTask,
  scheduledJobSlot: (task: string) => (task === 'cleanup-images' ? '2026-07' : '2026-07-04'),
}));

describe('scheduled jobs route', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    qstashMock.verify.mockResolvedValue(true);
    scheduledMock.claimScheduledJobRun.mockResolvedValue({ state: 'claimed', attempts: 1 });
    scheduledMock.completeScheduledJobRun.mockResolvedValue(undefined);
    scheduledMock.failScheduledJobRun.mockResolvedValue(undefined);
    scheduledMock.runScheduledJobTask.mockResolvedValue({
      status: 200,
      body: { data: { runFullMaintenance: true } },
    });
  });

  it('returns 401 when the QStash signature is missing', async () => {
    const { POST } = await import('@/app/api/internal/scheduled-jobs/route');
    const response = await POST(new Request('https://app.test/api/internal/scheduled-jobs', {
      method: 'POST',
      body: JSON.stringify({ task: 'daily-maintenance-full' }),
    }));

    expect(response.status).toBe(401);
    expect(qstashMock.verify).not.toHaveBeenCalled();
  });

  it('returns 401 when signature verification fails', async () => {
    qstashMock.verify.mockRejectedValue(new TestSignatureError());
    const { POST } = await import('@/app/api/internal/scheduled-jobs/route');
    const response = await POST(new Request('https://app.test/api/internal/scheduled-jobs', {
      method: 'POST',
      headers: { 'Upstash-Signature': 'invalid' },
      body: JSON.stringify({ task: 'daily-maintenance-full' }),
    }));

    expect(response.status).toBe(401);
    expect(scheduledMock.runScheduledJobTask).not.toHaveBeenCalled();
  });

  it('returns 400 for signed malformed JSON', async () => {
    const { POST } = await import('@/app/api/internal/scheduled-jobs/route');
    const response = await POST(new Request('https://app.test/api/internal/scheduled-jobs', {
      method: 'POST',
      headers: { 'Upstash-Signature': 'valid' },
      body: '{',
    }));
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error).toBe('invalid_json');
  });

  it('returns 400 for an unknown signed task', async () => {
    const { POST } = await import('@/app/api/internal/scheduled-jobs/route');
    const response = await POST(new Request('https://app.test/api/internal/scheduled-jobs', {
      method: 'POST',
      headers: { 'Upstash-Signature': 'valid' },
      body: JSON.stringify({ task: 'unknown' }),
    }));
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error).toBe('invalid_task');
  });

  it('runs a signed scheduled task and completes the slot lock', async () => {
    const { POST } = await import('@/app/api/internal/scheduled-jobs/route');
    const response = await POST(new Request('https://app.test/api/internal/scheduled-jobs', {
      method: 'POST',
      headers: { 'Upstash-Signature': 'valid' },
      body: JSON.stringify({ task: 'daily-maintenance-full' }),
    }));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(scheduledMock.claimScheduledJobRun).toHaveBeenCalledWith(expect.anything(), 'daily-maintenance-full', '2026-07-04');
    expect(scheduledMock.runScheduledJobTask).toHaveBeenCalledWith('daily-maintenance-full');
    expect(scheduledMock.completeScheduledJobRun).toHaveBeenCalledWith(expect.anything(), 'daily-maintenance-full', '2026-07-04');
    expect(body.data).toMatchObject({ task: 'daily-maintenance-full', status: 'processed' });
  });

  it('does not rerun an already processed slot', async () => {
    scheduledMock.claimScheduledJobRun.mockResolvedValue({ state: 'already_processed', attempts: 1 });
    const { POST } = await import('@/app/api/internal/scheduled-jobs/route');
    const response = await POST(new Request('https://app.test/api/internal/scheduled-jobs', {
      method: 'POST',
      headers: { 'Upstash-Signature': 'valid' },
      body: JSON.stringify({ task: 'cleanup-images' }),
    }));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.data).toMatchObject({ task: 'cleanup-images', status: 'already_processed' });
    expect(scheduledMock.runScheduledJobTask).not.toHaveBeenCalled();
  });

  it('keeps QStash retrying while the same slot is still in progress', async () => {
    scheduledMock.claimScheduledJobRun.mockResolvedValue({ state: 'in_progress', attempts: 1 });
    const { POST } = await import('@/app/api/internal/scheduled-jobs/route');
    const response = await POST(new Request('https://app.test/api/internal/scheduled-jobs', {
      method: 'POST',
      headers: { 'Upstash-Signature': 'valid' },
      body: JSON.stringify({ task: 'cleanup-images' }),
    }));
    const body = await response.json();

    expect(response.status).toBe(409);
    expect(response.headers.get('Retry-After')).toBe('60');
    expect(body.error).toBe('scheduled_job_in_progress');
    expect(scheduledMock.runScheduledJobTask).not.toHaveBeenCalled();
  });

  it('marks the slot failed and returns 500 when the runner fails', async () => {
    scheduledMock.runScheduledJobTask.mockResolvedValue({ status: 500, body: { error: 'maintenance failed' } });
    const { POST } = await import('@/app/api/internal/scheduled-jobs/route');
    const response = await POST(new Request('https://app.test/api/internal/scheduled-jobs', {
      method: 'POST',
      headers: { 'Upstash-Signature': 'valid' },
      body: JSON.stringify({ task: 'daily-maintenance-full' }),
    }));
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body.error).toBe('maintenance failed');
    expect(scheduledMock.failScheduledJobRun).toHaveBeenCalledWith(expect.anything(), 'daily-maintenance-full', expect.any(String), 'maintenance failed');
  });
});
