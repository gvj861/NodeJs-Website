import {getAdminPanel} from './getAdminPanel'
 
const userid = localStorage.getItem('userid')
const token = localStorage.getItem('token')

// no security for admin sections -- note because m only the admin

const getAdminPanelListener = (e) => {
    e.preventDefault();
    getAdminPanel(userid,token)
}

module.exports = {
    getAdminPanelListener : getAdminPanelListener
}