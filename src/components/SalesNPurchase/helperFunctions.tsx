export const getItemNo = (item:any) => {
    return item?.Item?.itemNo || item?.itemNo || "N/A";
  };
  
  export const getEnglishDescription = (item:any) => {
    return item?.Item?.englishDescription || item?.englishDescription || "";
  };
  
  export const getArabicDescription = (item:any) => {
    return item?.Item?.arabicDescription || item?.arabicDescription || "";
  };
  
  export const getBasicUnit = (item:any) => {
    return item?.Item?.basicUnit || item?.basicUnit || "N/A";
  };
  
  export const getUnitPrice = (item:any) => {
    return item?.Item?.retailPrice || item?.retailPrice || "N/A";
  };
  
  export const combineDescription = (english:any, arabic:any) => {
    return `${english || "No English Description"} / ${
      arabic || "No Arabic Description"
    }`;
  };

  export const getTotalPrice = (item:any, isEditMode:any) => {
    const quantity = item?.quantity || 0;
    
    const retailPrice = item?.Item?.retailPrice || item?.retailPrice || 0;
    // Ensure both values are numbers before multiplication
    return quantity * (retailPrice || 0);
  };
  
  