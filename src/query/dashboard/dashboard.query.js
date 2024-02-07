import axios from '../../axios'

export const getSuperAdminStats = async () => {
    return await axios.get('/cms/super-admin/dashboard')
}