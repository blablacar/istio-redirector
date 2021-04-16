import ActiveLink from './ActiveLink'

const Nav = () => {

    return (
        <nav className="bg-gray-800">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="hidden sm:block sm:ml-6">
                            <div className="flex space-x-4">
                                <ActiveLink activeClassName="bg-gray-900" href="/">
                                    <a className="text-white px-3 py-2 rounded-md text-sm font-medium">Dashboard</a>
                                </ActiveLink>
                            </div>
                        </div>
                        <div className="hidden sm:block sm:ml-6">
                            <div className="flex space-x-4">
                                <ActiveLink activeClassName="bg-gray-900" href="/documentation">
                                    <a className="text-white px-3 py-2 rounded-md text-sm font-medium">Documentation</a>
                                </ActiveLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Nav
