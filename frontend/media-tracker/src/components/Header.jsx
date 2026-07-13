import NavBar from "./NavBar"

const Header = () => {
    return (
        <header className="w-full h-16 bg-header border-b border-slate-800">
            <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
                <NavBar />
            </div>
        </header>

    )
}

export default Header