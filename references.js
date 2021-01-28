const mdnBrowserCompatData = require('@mdn/browser-compat-data');

const getKeywords = (obj) => {
    let KeywordsAndUrls = {};
    for(const firstChild in obj) {
        if(obj[firstChild]['__compat']) {
            if(obj[firstChild]['__compat']['mdn_url']) {
                KeywordsAndUrls[firstChild] = obj[firstChild]['__compat']['mdn_url'];
            }
            for(const secondChild in obj[firstChild]) {
                if(secondChild !== '__compat' && obj[firstChild][secondChild]['__compat']) {
                    if(obj[firstChild][secondChild]['__compat']['mdn_url']) {
                        KeywordsAndUrls[secondChild] = obj[firstChild][secondChild]['__compat']['mdn_url'];
                    }
                }
            }
        } else if(obj[firstChild]['flex_context']) {
            KeywordsAndUrls[firstChild] = obj[firstChild]['flex_context']['__compat']['mdn_url'];
            for(const secondChild in obj[firstChild]) {
                if(secondChild !== '__compat' && obj[firstChild][secondChild]['__compat']) {
                    if(obj[firstChild][secondChild]['__compat']['mdn_url']) {
                        KeywordsAndUrls[secondChild] = obj[firstChild][secondChild]['__compat']['mdn_url'];
                    }
                }
            }
        }
    }
    return KeywordsAndUrls;
}

const apiKeywords = getKeywords(mdnBrowserCompatData.api),
cssAtRulesKeywords = getKeywords(mdnBrowserCompatData.css['at-rules']),
cssPropertiesKeywords = getKeywords(mdnBrowserCompatData.css.properties),
cssTypesKeywords = getKeywords(mdnBrowserCompatData.css.types),
htmlElementsKeywords = getKeywords(mdnBrowserCompatData.html.elements),
htmlGlobalAttributesKeywords = getKeywords(mdnBrowserCompatData.html['global_attributes']),
htmlManifestKeywords = getKeywords(mdnBrowserCompatData.html.manifest),
javascriptBuiltinsKeywords = getKeywords(mdnBrowserCompatData.javascript.builtins),
javascriptClassesKeywords = getKeywords(mdnBrowserCompatData.javascript.classes),
javascriptFunctionsKeywords = getKeywords(mdnBrowserCompatData.javascript.functions),
javascriptGrammarKeywords = getKeywords(mdnBrowserCompatData.javascript.grammar),
javascriptOperatorsKeywords = getKeywords(mdnBrowserCompatData.javascript.operators),
javascriptStatementsKeywords = getKeywords(mdnBrowserCompatData.javascript.statements),
mathmlElementsKeywords = getKeywords(mdnBrowserCompatData.mathml.elements),
svgAttributesKeywords = getKeywords(mdnBrowserCompatData.svg.attributes),
svgAttributesConditionalProcessingKeywords = getKeywords(mdnBrowserCompatData.svg.attributes['conditional_processing']),
svgAttributesCoreKeywords = getKeywords(mdnBrowserCompatData.svg.attributes.core),
svgAttributesEventsGlobalKeywords = getKeywords(mdnBrowserCompatData.svg.attributes.events.global),
svgAttributesEventsAnimationKeywords = getKeywords(mdnBrowserCompatData.svg.attributes.events.animation),
svgAttributesEventsDocumentKeywords = getKeywords(mdnBrowserCompatData.svg.attributes.events.document),
svgAttributesEventsGraphicalKeywords = getKeywords(mdnBrowserCompatData.svg.attributes.events.graphical),
svgAttributesPresentationKeywords = getKeywords(mdnBrowserCompatData.svg.attributes.presentation),
svgAttributesStyleKeywords = getKeywords(mdnBrowserCompatData.svg.attributes.style),
svgAttributesXlinkKeywords = getKeywords(mdnBrowserCompatData.svg.attributes.xlink),
svgElementsKeywords = getKeywords(mdnBrowserCompatData.svg.elements);

const allKeywordsAndUrlsParents = {apiKeywords, cssAtRulesKeywords, cssPropertiesKeywords, cssTypesKeywords, htmlElementsKeywords, htmlGlobalAttributesKeywords, htmlManifestKeywords, javascriptBuiltinsKeywords, javascriptClassesKeywords, javascriptFunctionsKeywords, javascriptGrammarKeywords, javascriptOperatorsKeywords, javascriptStatementsKeywords, mathmlElementsKeywords, svgAttributesKeywords, svgAttributesConditionalProcessingKeywords, svgAttributesCoreKeywords, svgAttributesEventsGlobalKeywords, svgAttributesEventsAnimationKeywords, svgAttributesEventsDocumentKeywords, svgAttributesEventsGraphicalKeywords, svgAttributesPresentationKeywords, svgAttributesStyleKeywords, svgAttributesXlinkKeywords, svgElementsKeywords};

module.exports.groupAllKeywords = () => {
    const keywordKeysInParentsGroups = [], keywordKeysInOneGroup = [];
    
    for(const keywordParent in allKeywordsAndUrlsParents) {
        keywordKeysInParentsGroups.push(Object.keys(allKeywordsAndUrlsParents[keywordParent]));
    }

    keywordKeysInParentsGroups.forEach( parentt => {
        parentt.forEach( individualKeyword => {
            keywordKeysInOneGroup.push(individualKeyword);
        });
    });

    return keywordKeysInOneGroup;
}

module.exports.randomizeKeywords = () => {
    return this.groupAllKeywords().sort((a, b) => {
        return 0.5 - Math.random();
    });
}