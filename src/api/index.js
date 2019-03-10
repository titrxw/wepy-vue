import ajax from './ajax'

export default {
    getCurTime() {
        return ajax.get('common/getCurrentTime')
    },
    miniProgramLogin(params) {
        return ajax.post('common/miniProgramLogin', params)
    },
    register(params) {
        return ajax.post('common/bind', {
            form: params
        })
    },
    unbound() {
        return ajax.get('member/unbound')
    },
    changePassword(form) {
        return ajax.post('member/changePassword', { form })
    },
    about() {
        return ajax.get('common/aboutUs')
    },
    feedBackTypes() {
        return ajax.get('common/feedbackTypeList')
    },
    feedBack(form) {
        return ajax.post('common/feedback', { form })
    },

    // 通知
    getNotify() {
        return ajax.get('common/feedbackTypeList')
    }
}