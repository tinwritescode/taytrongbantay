import React from 'react'
import Link from 'next/link'

function Header() {
    return (
        <div className="Header shadow-md">
            <Link href="/">
                <a>
                    <div className="Header--logo"></div>
                </a>
            </Link>

            <div className="Navbar">
                <div className="Navbar--item">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                </svg>
                </div>
                <div className="Navbar--item">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-suit-heart stroke-1" viewBox="0 0 16 16">
                    <path d="m8 6.236-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595L8 6.236zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.55 7.55 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z"/>
                </svg>  
                </div>

</div>
            <style jsx>{
                `.Header {
                    box-sizing: border-box;
                    display: flex;
                    padding: 0.3rem;
                    justify-content: space-around;
                    align-items: center;
                }

                .Header--logo {
                    background: url(http://localhost:3000/images/LOGO-TTBT2.png) no-repeat;
                    background-size: cover;
                    width: 50px;
                    height: 50px;
                }
                
                .Navbar {
                    list-style: none;
                    display: flex;
                    justify-content: space-between;
                }
                
                .Navbar--item svg {
                    width: 1.5rem;
                    max-width:100%;
                    min-height:100%;
                }

                .Navbar--item::first-child {
                    margin-right: 10px;
                }
                `
            }</style>
        </div>
    )
}

export default Header
