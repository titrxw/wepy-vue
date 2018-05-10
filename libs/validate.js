export default {
  isMobile (mobile) {
    if (/^1\d{10}$/.test(mobile)) {
      return true;
    }
    return false;
  },
  isIdCard (idCard) {
    if (/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(idCard)) {
      return true
    }
    return false
  }
}