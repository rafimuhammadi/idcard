import axios from 'axios'
// import PaginationData from './PaginationData'
var CryptoJS = require('crypto-js')
const API_URL = process.env.REACT_APP_API_URL
export const REGISTER_URL = `${API_URL}api/directorate/store`
export const GETRECORD_URL = `${API_URL}/getDirectorate`
// Server should return AuthModel
export function registerDirectorate(
  name_fa: string,
  name_pa: string,
  name_en: string,
  code: string
) {
  return axios.post(REGISTER_URL, {
    name_fa,
    name_pa,
    name_en,
    code,
  })
}
export function registerDepartment(
  name_fa: string,
  name_pa: string,
  name_en: string,
  directorateId: string,
  depCode: string
) {
  return axios.post('storeDepartment', {
    name_fa,
    name_pa,
    name_en,
    directorateId,
    depCode,
  })
}
export function Encrypt(pureText: any) {
  const privateKey = process.env.REACT_APP_SECRET_KEY
  var ciphertext = encodeURIComponent(
    CryptoJS.AES.encrypt(JSON.stringify(pureText), privateKey).toString()
  )
  return ciphertext
}

export function Decrypt(encryptedText: any) {
  const privateKey = process.env.REACT_APP_SECRET_KEY
  var bytes = CryptoJS.AES.decrypt(decodeURIComponent(encryptedText), privateKey)
  var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
  return decryptedData
}

export const provices = async () => {
  const response = await axios.get('provinces')
  return response.data
}
// export default DarLocaliczeDatePicker
export const userStaus = {
  statusType: [
    {id: 0, name: 'فعال'},
    {id: 1, name: 'غیر فعال'},
  ],
}
const DarLocaliczeDatePicker = {
  name: 'DarLocaliczeDatePicker',
  months: [
    ['حمل', 'فر'],
    ['ثور', 'ار'],
    ['جوزا', 'خرد'],
    ['سرطان', 'تیر'],
    ['اسد', 'مر'],
    ['سنبله', 'شه'],
    ['میزان', 'مه'],
    ['عقرب', 'آبا'],
    ['قوس', 'آذ'],
    ['جدی', 'دی'],
    ['دلو', 'بهم'],
    ['حوت', 'اسف'],
  ],
  weekDays: [
    ['شنبه', 'شن'],
    ['یکشنبه', 'یک'],
    ['دوشنبه', 'دو'],
    ['سه شنبه', 'سه'],
    ['چهارشنبه', 'چهار'],
    ['پنجشنبه', 'پنج'],
    ['جمعه', 'جم'],
  ],
  digits: ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'],
  meridiems: [
    ['قبل از ظهر', 'ق.ظ'],
    ['بعد از ظهر', 'ب.ظ'],
  ],
}
export default DarLocaliczeDatePicker
