const {
  getNamedType,
  isEnumType,
  TypeInfo,
  visit,
  visitWithTypeInfo,
} = require('graphql');

module.exports = {
  plugin(schema, documents) {
    const enumNames = new Set();

    for (const source of documents) {
      if (!source.document) continue;
      const typeInfo = new TypeInfo(schema);
      visit(source.document, visitWithTypeInfo(typeInfo, {
        Field() {
          const type = typeInfo.getType();
          if (!type) return;
          const named = getNamedType(type);
          if (isEnumType(named)) enumNames.add(named.name);
        },
        VariableDefinition() {
          const type = typeInfo.getInputType();
          if (!type) return;
          const named = getNamedType(type);
          if (isEnumType(named)) enumNames.add(named.name);
        },
      }));
    }

    const declarations = [...enumNames]
      .sort((left, right) => left.localeCompare(right))
      .map((name) => {
        const type = schema.getType(name);
        if (!type || !isEnumType(type)) return '';
        const values = type.getValues().map((value) => JSON.stringify(value.value ?? value.name));
        return `  type ${name} = ${values.join(' | ')};`;
      })
      .filter(Boolean)
      .join('\n\n');

    return [
      '// Generated from the live ikas schema. Do not edit manually.',
      'declare global {',
      declarations,
      '}',
      '',
      'export {};',
      '',
    ].join('\n');
  },
};
