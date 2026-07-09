---
type: context
project: renuvex-product-reviews
status: active
created: 2026-05-05
updated: 2026-07-09
last_verified: 2026-07-09
confidence: high
tags:
  - index
  - ikas
  - reviews
related:
  - "[[Hot_Context]]"
  - "[[Project_Overview]]"
  - "[[Current_Status]]"
source_files: []
---

# ikas Review App Wiki Index

> Renuvex Product Reviews - review & rating app for ikas e-commerce stores. Merchant admin + storefront widget + structured-data integration.

## Start Here
- [[Hot_Context]] - fast active context for new sessions
- [[Project_Overview]] - what the app is and who it's for
- [[Current_Status]] - current phase, working features, in-progress work
- [[Roadmap]] - planned features and rough sequence
- [[Open_Questions]] - uncertain areas that need a decision
- [[Glossary]] - domain vocabulary (ikas-specific and project-specific)
- [[Feature_Map]] - feature inventory with implementation status
- [[Project_Index]] - quick links to source code entry points
- [[Log]] - project-memory event log

## Task Routing

| Task Type | Read First | Then Read | Then Inspect |
|---|---|---|---|
| New session / unclear task | [[Hot_Context]], [[Current_Status]] | [[Project_Overview]], [[Open_Questions]] | Related source files from focused pages |
| Admin UI / widget editor task | [[Frontend_Map]], [[Widget_Customization]] | [[Feature_Map]], relevant widget pages | `src/components/home-page/widgets/*` |
| Storefront widget task | [[Widget_Architecture]], [[Storefront_Widget_Overview]] | Relevant `08_Widgets` pages and ADRs | `src/widget/*`, `public/widget.js` |
| Modular widget loader / Yotpo-like architecture | [[Yotpo_Style_Widget_Modular_Architecture]], [[Phase_1_Widget_Runtime_Audit]], [[Phase_2_Widget_Module_Split_Plan]] | [[Yotpo_Protein_Ocean_Widget_Research]], [[Ikas_Storefront_Script_Capabilities]], [[Widget_Performance]] | `src/widget/*`, `scripts/build-widget.mjs`, storefront smoke output |
| API task | [[Backend_API_Map]], [[API_Design]] | [[Ikas_API_Notes]], [[Security_And_Rate_Limits]] | `src/app/api/*`, `src/lib/*` |
| Database task | [[Database_Map]], [[Database_Schema]] | [[Decision_Index]] | `prisma/schema.prisma`, `prisma/migrations/*` |
| Auth / ikas install task | [[Auth_And_Installation_Flow]], [[Ikas_OAuth_Installation_Notes]] | [[Security_And_Rate_Limits]], [[ADR_0004_Ikas_Integration_Strategy]] | OAuth/API helper files |
| Deployment / observability task | [[Deployment_Notes]], [[Sentry_Operations]] | [[Config_And_Env_Map]], [[Caching_And_Performance]] | `next.config.js`, `vercel.json`, Sentry config files |
| Automated test / CI task | [[Test_Strategy]], [[Widget_Architecture]] | [[Backend_API_Map]], [[Widget_Performance]] | `tests/*`, `.github/workflows/*`, `package.json` |
| Recurring bug | [[Bug_Index]], [[Recurring_Problems]] | Relevant bug note, [[Problem_Resolution_Prompt]] | Related source files in the bug note |
| Architecture change | [[System_Architecture]], [[Decision_Index]] | Relevant ADRs | Affected modules and config |
| Wiki maintenance | [[Agent_Rules]], [[Wiki_Maintenance_Prompt]] | [[Documentation_Update_Prompt]], [[Log]] | `docs/wiki/**`, `scripts/wiki-*` |

## Codebase Map
- [[Folder_Structure]]
- [[Important_Files]]
- [[Frontend_Map]]
- [[Backend_API_Map]]
- [[Database_Map]]
- [[Widget_Files_Map]]
- [[Config_And_Env_Map]]
- [[Dependency_Map]]

## Architecture
- [[System_Architecture]]
- [[Database_Schema]]
- [[Widget_Architecture]]
- [[API_Design]]
- [[Auth_And_Installation_Flow]]
- [[Caching_And_Performance]]
- [[Security_And_Rate_Limits]]
- [[Deployment_Notes]]
- [[Sentry_Operations]]
- [[AWS_Setup_And_Access]]
- [[Maintenance_Runbook]]
- [[AWS_CloudFront_Widget_Canary_Runbook]]
- [[Review_Video_Canary_Runbook]]
- [[Review_Video_Manual_Repair_Runbook]]
- [[Review_Video_Physical_Device_Acceptance_2026-06]]
- [[Test_Strategy]]
- [[Yotpo_Style_Widget_Modular_Architecture]]
- [[Theme_Adapter_Playbook]]

## ikas
- [[Ikas_Platform_Notes]]
- [[Ikas_API_Notes]]
- [[Ikas_Widget_Injection_Notes]]
- [[Ikas_Storefront_Script_Capabilities]]
- [[Ikas_Storefront_Events]]
- [[Ikas_Theme_Limitations]]
- [[Ikas_App_Store_Requirements]]
- [[Ikas_OAuth_Installation_Notes]]

## Widgets
- [[Storefront_Widget_Overview]]
- [[Product_Rating_Badge]]
- [[Product_Review_Widget]]
- [[Product_Review_Lightbox]]
- [[Media_Gallery]]
- [[Listing_Rating_Widget]]
- [[Widget_Customization]]
- [[Summary_Layout_Padding_Strategy]]
- [[Widget_Performance]]
- [[Structured_Data_And_Rich_Snippets]]

## Decisions
- [[Decision_Index]]
- [[ADR_0001_Project_Stack]]
- [[ADR_0002_Widget_Injection_Strategy]]
- [[ADR_0003_Review_Data_Model]]
- [[ADR_0004_Ikas_Integration_Strategy]]
- [[ADR_0005_Summary_Layout_Visual_Consistency_Strategy]]
- [[ADR_0006_Trusted_Review_Image_URL_Policy]]
- [[ADR_0007_Photo_Strip_Cap_And_Rotation]]
- [[ADR_0008_Cloud_Name_Build_Time_Only]]
- [[ADR_0009_Sentry_Observability_Strategy]]
- [[ADR_0010_Widget_Error_Forwarding]]
- [[ADR_0011_Widget_Touch_Feedback_And_Focus_Modality]]
- [[ADR_0012_Pending_Upload_Registry]]
- [[ADR_0013_Modular_Widget_Loader_Architecture]]
- [[ADR_0014_Public_API_Response_Caching]]
- [[ADR_0015_Canonical_Product_Identity]]
- [[ADR_0016_Rating_Visual_System]]
- [[ADR_0017_Badge_Architecture]]
- [[ADR_0018_Widget_Ownership_And_Placement_Resilience]]
- [[ADR_0019_Icon_Sprite_Rendering]]
- [[ADR_0020_Renuvex_Product_Reviews_Namespace_Migration]]
- [[ADR_0033_Cloudflare_Worker_Widget_Asset_Delivery]]
- [[ADR_0034_AWS_Review_Image_Migration]]
- [[ADR_0035_QStash_Scheduler_For_Maintenance]]
- [[ADR_0036_Review_Request_Email_Architecture]]

## Bugs And Fixes
- [[Bug_Index]]
- [[Solved_Issues]]
- [[Recurring_Problems]]
- [[Debugging_Notes]]

## Competitors
- [[Judge_Me]]
- [[Yotpo]]
- [[Loox]]
- [[Okendo]]
- [[Competitor_Pricing_And_Plans]]

## Prompts (AI workflows)
- [[Agent_Rules]]
- [[New_Session_Start_Prompt]]
- [[Wiki_Maintenance_Prompt]]
- [[Problem_Resolution_Prompt]]
- [[IDE_Agent_Usage]]
- [[Existing_AI_Rules_And_Ikas_CLI_Instructions]] - canonical pre-existing rule files (Ruler-generated CLAUDE/AGENTS/cursor) + ikas CLI config
- [[Master_Project_Prompt]]
- [[Claude_Code_Rules]]
- [[Codex_Rules]]
- [[Debug_Prompt]]
- [[Architecture_Review_Prompt]]
- [[Database_Review_Prompt]]
- [[Widget_Development_Prompt]]
- [[Documentation_Update_Prompt]]

## Research
- [[Review_App_Market_Research]]
- [[Competitor_Pricing_And_Plans]]
- [[Google_Rich_Snippets_Research]]
- [[Ecommerce_Review_UX_Patterns]]
- [[Review_Layout_Padding_Research]]
- [[Storefront_CDN_Performance_Benchmark]]
- [[Storefront_CDN_Cost_Model]]
- [[Review_Image_CDN_Cost_Model]]
- [[Review_App_Monthly_Cost_Model]]
- [[Upstash_Redis_QStash_Cost_Audit]]
- [[Yotpo_Protein_Ocean_Widget_Research]]
- [[Phase_1_Widget_Runtime_Audit]]
- [[Phase_2_Widget_Module_Split_Plan]]
- [[Phase_3_Widget_Lifecycle_Hardening]]
- [[Widget_Architecture_Audit]]
- [[Future_Feature_Ideas]]

## Templates
- [[Decision_Template]]
- [[Bug_Template]]
- [[Competitor_Template]]
- [[API_Note_Template]]
- [[Architecture_Template]]
- [[Feature_Template]]
- [[Prompt_Template]]
- [[Codebase_Map_Template]]

## Inbox
- [[Raw_Notes]] - drop ideas here, file later

---

**Last Updated:** 2026-07-09 (prepared source-only SES foundation package)
