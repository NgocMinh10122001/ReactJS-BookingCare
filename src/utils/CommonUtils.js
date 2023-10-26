class CommonUtils {
  // static isNumber1 (number) {
  //     if (number === 1) return true;
  //     return false;
  // }

  static getBase64(file) {
    return new Promise((resolve, reject) => {
      try {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      } catch (error) {
        console.log(error);
      }
    });
  }
}

export default CommonUtils;
