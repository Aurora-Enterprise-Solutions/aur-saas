// Aurora Design
import { aurES } from '@aurora-enterprise-solutions/aur-design'

// Aurora SaaS
import es from './es.json'
import en from './en.json'

export default {
    es : { ...aurES, ...es },
    en : { ...en },
}
