import axios from '../../axios'

export async function getTransactionList(params) {
  return await axios.get(`/transactions/list?size=${params.size}&pageNumber=${params.pageNumber - 1}&search=${params.search}&sort=${params.sort}&orderBy=ASC&totalElements=0&date=&eGender=${params.eGender}&isMobileVerified=&isEmailVerified=&eOpponent=&eStatus=${params.eStatus}&eType=${params.eType}&eCategory=${params?.eCategory}`)
}

