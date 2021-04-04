import { useEffect, useState } from 'react'
import getConfig from 'next/config'
import Exclamation from './Icons/exclamation'
import Check from './Icons/check'

const { publicRuntimeConfig } = getConfig()

const URLCheck = ({ url }) => {

    const [isValid, setValidity] = useState(false)

    useEffect(() => {
        fetch(`${publicRuntimeConfig.API_URL}/api/url/check?url=${url}`).then(async res => {
            if (res.ok) {
                setValidity(true)
            }
        }).catch(err => {
            setValidity(false)
        })

    }, [url])

    return (
        <div className="flex items-center">
            <div className="flex-shrink-0 h-10">{isValid ? <Check /> : <Exclamation />}</div>
        </div>
    )
}

export default URLCheck
