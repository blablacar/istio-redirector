import { useEffect, useState } from 'react'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

const URLCheck = ({ url }) => {

    const [isValid, setValidity] = useState(false)

    useEffect(() => {
        fetch(`${publicRuntimeConfig.API_URL}/api/url/check?url=${url}`).then(async res => {
            if (res.ok) {
                setValidity(true)
            }
            console.log(res);
            console.log(res.ok);
            console.log(res.status);
        }).catch(err => {
            setValidity(false)
        })

    }, [url])

    return (
        <div className="flex items-center">
            <div className="flex-shrink-0 h-10">{isValid ? "Exist" : 'Gone'}</div>
        </div>
    )
}

export default URLCheck
