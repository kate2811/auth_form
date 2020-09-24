import axios from 'axios'
import { SingUpData } from '../types'

const url = 'https://api.raisely.com/v3'

export async function signUp(userData: SingUpData) {
  const data = {
    campaignUuid: '46aa3270-d2ee-11ea-a9f0-e9a68ccff42a',
    data: userData
  }
  try {
    const response = await axios.post(url + '/signup', data)
    return response.data
  } catch (e) {
    alert('Something went wrong. Please, try again')
  }
}

export async function checkEmailValidity(email: string) {
  const data = {
    campaignUuid: '46aa3270-d2ee-11ea-a9f0-e9a68ccff42a',
    data: {
      email: email
    }
  }
  const response = await axios.post(url + '/check-user ', data)
  return response.data.data.status === 'OK'
}
