import Condition from "shared/classes/Condition";
import Filter from "shared/classes/Filter";
import ParamMap from "shared/classes/ParamMap";
import * as Resources from "shared/models/resources";

export const convertDatasetFilterToParams = filter => {
  // converts an objects like:
  // const object = { dataset: ds, comparison: 'gte', value: '10', startDate '2017-01-01', endDate: '2018-01-01' }
  // into:
  // "hpdviolation__approveddate__gte=2017-01-01,hpdviolation__approveddate__lte=2018-01-01,hpdviolation__count__gte=10"
  return Object.keys(filter.paramSets)
    .map(key => {
      return filter.paramSets[key].paramMaps
        .map(paramMap => {
          const primaryModelFieldPath =
            filter.primaryResourceModel.relatedResourceMappings[filter.resourceModel.resourceConstant] + '__'
          return `${primaryModelFieldPath}${paramMap.field}${paramMap.comparison ? '__' + paramMap.comparison : ''}=${paramMap.type === 'PERCENT' ? paramMap.value / 100 : paramMap.value
            }`
        })
        .filter(p => p)
        .join(',')
    })
    .filter(p => p)
    .join(',')
}

export const parseUrlSearchParams = (searchParams, advancedSearch) => {
  if (searchParams.q) {
    try {
      let condition = convertQueryStringToCondition(searchParams.q);
      advancedSearch.conditions = [condition];
    }
    catch (e) {
      return false;
    }
  }
  if (!searchParams.housingtype ||
    !setPropertyFilterParamMapsFromSearchParams(
      searchParams, advancedSearch.propertyFilter
    )) {
    return false;
  }

  return true;
}

const setPropertyFilterParamMapsFromSearchParams = (searchParams, propertyFilter) => {
  const housingType = searchParams.housingtype;
  const subsidyPrograms = searchParams.subsidyprograms__programname__any;
  const managementPrograms = searchParams.propertyannotation__managementprogram;
  const rsUnitsLost = searchParams.rsunitslost__gte || searchParams.rsunitslost__lte || searchParams.rsunitslost__exact;
  const rsUnitsLostFrom = searchParams.rsunitslost__start;
  const rsUnitsLostTo = searchParams.rsunitslost__end;
  const expiry = searchParams.coresubsidyrecord__enddate__gte || searchParams.coresubsidyrecord__enddate__lte;
  const unitsRes = searchParams.unitsres__lte || searchParams.unitsres__gte || searchParams.unitsres__exact;
  const unitsResMin = searchParams.unitsres__gt;
  const unitsResMax = searchParams.unitsres__lt;


  const sroUnits = searchParams.propertyannotation__legalclassb__gte;

  propertyFilter.paramSets.initial.paramMaps[0].value = housingType;

  try {
    if (unitsRes) {
      const field = "unitsres";
      const comparison = searchParams.unitsres__lte && "lte" ||
        searchParams.unitsres__exact && "exact" ||
        searchParams.unitsres__gte && "gte";
      setParamSetParamMapsFromDefaults(field, comparison, unitsRes, propertyFilter);
    }



    if (unitsResMin) {
      const field = "unitsres";
      const comparison = searchParams.unitsres__gt && "gt"
      setParamSetParamMapsFromDefaults(field, comparison, unitsResMin, propertyFilter);
    }

    if (unitsResMax) {
      const field = "unitsres";
      const comparison = searchParams.unitsres__lt && "lt"
      setParamSetParamMapsFromDefaults(field, comparison, unitsResMax, propertyFilter);
    }

    if (rsUnitsLost) {
      const field = "rsunitslost";
      const comparison = searchParams.rsunitslost__lte && "lte" ||
        searchParams.rsunitslost__exact && "exact" ||
        searchParams.rsunitslost__gte && "gte";
      setParamSetParamMapsFromDefaults(field, comparison, rsUnitsLost, propertyFilter);
    }

    if (rsUnitsLostFrom) {
      const field = "rsunitslost";
      const comparison = "start";
      setParamSetParamMapsFromDefaults(field, comparison, rsUnitsLostFrom, propertyFilter);
    }

    if (rsUnitsLostTo) {
      const field = "rsunitslost";
      const comparison = "end";
      setParamSetParamMapsFromDefaults(field, comparison, rsUnitsLostTo, propertyFilter);
    }

    if (sroUnits) {
      const field = "propertyannotation__legalclassb";
      const comparison = "gte";
      setParamSetParamMapsFromDefaults(field, comparison, sroUnits, propertyFilter);
    }

    if (managementPrograms) {
      const field = "propertyannotation__managementprogram";
      const comparison = "";
      setParamSetParamMapsFromDefaults(field, comparison, managementPrograms, propertyFilter);
    }

    if (expiry) {
      const field = "coresubsidyrecord__enddate";
      const comparison = searchParams.coresubsidyrecord__enddate__gte && "gte" || "lte";
      setParamSetParamMapsFromDefaults(field, comparison, expiry, propertyFilter);
    }

    if (subsidyPrograms) {
      const field = "subsidyprograms__programname";
      const comparison = "any";
      setParamSetParamMapsFromDefaults(field, comparison, subsidyPrograms, propertyFilter);
    }
  }
  catch (e) {
    return false;
  }

  return true
}

const setParamSetParamMapsFromDefaults = (field, comparison, value, propertyFilter) => {
  let targetParamSetKey = Object.keys(propertyFilter.paramSets).filter(paramSetKey =>
    propertyFilter.paramSets[paramSetKey].defaults.some(paramMap => paramMap.field === field)
  )[0];

  let targetParamMap;
  if (field === "rsunitslost") {
    let targetComaparison = comparison === "lte" ||
      comparison === "gte" || comparison === "exact" ? "gte" : comparison;
    targetParamMap = propertyFilter.paramSets[targetParamSetKey].defaults.find(paramMap =>
      paramMap.field === field && paramMap.comparison === targetComaparison
    );
  }
  else if (field === "coresubsidyrecord__enddate") {
    targetParamMap = propertyFilter.paramSets[targetParamSetKey].defaults.find(paramMap =>
      paramMap.field === field && paramMap.comparison === comparison
    );
  }
  else {
    targetParamMap = propertyFilter.paramSets[targetParamSetKey].defaults.find(paramMap =>
      paramMap.field === field
    );
  }

  let newParamMap = targetParamMap.clone();
  newParamMap.value = value;
  newParamMap.comparison = comparison;
  propertyFilter.paramSets[targetParamSetKey].paramMaps.push(newParamMap);
}

const convertQueryStringToCondition = query => {
  const querySplit = query.split(" ");

  const conditionSplit = querySplit[0].split("=");
  const conditionKey = conditionSplit[0].split("_")[1];
  const conditionType = conditionSplit[1];

  let filters = [];
  for (let i = 1; i < querySplit.length; i++) {
    const thisFilterSplit = querySplit[i].split("=");
    const thisFilterKey = thisFilterSplit[0].split("_")[1];

    const params = thisFilterSplit.slice(1).join("=").split(",");
    let resourceConstant;
    let resourceModel
    let paramSets = {};
    for (let param of params) {
      const [paramKey, paramValue] = param.split("=");
      let [resourceKey, field, comparison] = paramKey.split("__");

      if (paramKey.startsWith('acrisreallegals')) {
        let [rkPart1, rkPart2, f, c] = paramKey.split("__");
        resourceKey = rkPart1 + "__" + rkPart2;
        field = f;
        comparison = c;
      }

      if (!resourceConstant) {
        resourceConstant = Object.keys(
          Resources.PROPERTY().relatedResourceMappings).find((key) =>
            Resources.PROPERTY().relatedResourceMappings[key] === resourceKey
          );
        resourceModel = Resources[resourceConstant]();
        Object.keys(resourceModel.ownResourceFilters).forEach(setKey =>
          paramSets[setKey] =
          resourceModel.ownResourceFilters[setKey]
            .generatorFunction(resourceModel)
        );

        Object.keys(paramSets).forEach(paramSetKey =>
          paramSets[paramSetKey].paramMaps = []
        );
      }

      let targetParamSet = paramSets[field] ? field : "initial";
      let targetDefault;
      if (targetParamSet === "initial" && comparison) {
        targetDefault = paramSets[targetParamSet].defaults.find(
          paramMap => paramMap.field === field && paramMap.comparison === comparison
        );
      }
      else if (targetParamSet === "initial") {
        targetDefault = paramSets[targetParamSet].defaults.find(
          paramMap => paramMap.field === field
        );
      }
      else if (comparison) {
        targetDefault = paramSets[targetParamSet].defaults.find(
          paramMap => paramMap.field === field && paramMap.comparison === comparison
        );
      }
      else {
        targetDefault = paramSets[targetParamSet].defaults.find(
          paramMap => paramMap.field === field
        );
      }
      let thisParamMap = targetDefault.clone();
      thisParamMap.value = paramValue;
      paramSets[targetParamSet].paramMaps.push(thisParamMap);
    }

    filters.push(
      new Filter({
        key: thisFilterKey,
        resourceModel: Resources[resourceConstant](),
        primaryResourceModel: Resources.PROPERTY(),
        paramSets
      })
    );
  }

  let condition = new Condition({
    key: conditionKey,
    type: conditionType,
    filters
  });
  return condition;
}

const convertConditionGroupToString = filters => {
  return filters
    .map((filterObject, index) => {
      const groupLabel = `filter_${index}`
      if (filterObject.conditionGroup) {
        return `${groupLabel}=condition_${filterObject.conditionGroup}`
      } else {
        return `${groupLabel}=${convertDatasetFilterToParams(filterObject)}`
      }
    })
    .join(' ')
}

export const convertConditionMappingToQ = conditions => {
  if (Object.values(conditions).some(condition => !condition.filters.length)) return null
  return Object.keys(conditions)
    .map(key => `*condition_${key}=${conditions[key].type} ${convertConditionGroupToString(conditions[key].filters)}`)
    .join(' ')
}
