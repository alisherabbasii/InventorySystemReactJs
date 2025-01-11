export const getItemNo = (item:any) => {
    return item?.Item?.itemCode || item?.itemCode || "N/A";
  };
  export const truncateDescription = (description: string, maxLength: number = 50): string => {
    if (!description) return "";
    return description.length > maxLength ? `${description.slice(0, maxLength)}...` : description;
  };
  export const getEnglishDescription = (item:any) => {
    const description = item?.Item?.englishDescription || item?.englishDescription || "";
  return truncateDescription(description, 20);
    // return item?.Item?.englishDescription || item?.englishDescription || "";
  };
  
  export const getArabicDescription = (item:any) => {
    // return item?.Item?.arabicDescription || item?.arabicDescription || "";
    const description = item?.Item?.arabicDescription || item?.arabicDescription || "";
    return truncateDescription(description, 20);
  };
  
  export const getBasicUnit = (item:any) => {
    return item?.Item?.basicUnit || item?.basicUnit || "N/A";
  };
  
  export const getUnitPrice = (item:any) => {
    // debugger;
    return item?.retailPrice || item?.retailPrice || "";
  };
  
  export const getCostPrice = (item:any) => {
    return item?.Item?.costPrice || item?.costPrice || 0;
  };

  export const getReservedQuantity = (item:any) => {
    return item?.Item?.reservedQuantity || item?.reservedQuantity || 0;
  };
  // reservedQuantity
  export const combineDescription = (english:any, arabic:any) => {
    return `${english || "No English Description"} / ${
      arabic || "No Arabic Description"
    }`;
  };

  export const getTotalPrice = (item:any, isEditMode:any) => {
    const quantity = item?.quantity || 0;
    
    const retailPrice = item?.retailPrice || item?.retailPrice || 0;
    // Ensure both values are numbers before multiplication
    return quantity * (retailPrice || 0);
  };
  
  