const { mapSchema, MapperKind, getDirective } = require("@graphql-tools/utils");
const { defaultFieldResolver } = require("graphql");

function upperDirectiveTransformer(schema, directiveName) {
    return mapSchema(schema, {
        [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
            const upperDirective = getDirective(schema, fieldConfig, directiveName)
            if(upperDirective) {
                const { resolve = defaultFieldResolver } = fieldConfig
                fieldConfig.resolve = async function(parent, args, context, info){
                    const result = await resolve(parent, args, context, info)
                    if(typeof result === 'string'){
                        return result.toLocaleUpperCase()
                    }
                    return result
                }
                return fieldConfig
            }
        }
    })
}

module.exports = { upperDirectiveTransformer }

