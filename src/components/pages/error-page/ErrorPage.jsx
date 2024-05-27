import './error-page-styles/error-page.css'
import './error-page-styles/error-page-button.css'
import { Link } from 'react-router-dom'
import { GeneralContext } from '../../../App'
import { useContext } from 'react'

function ErrorPage() {

    const{isDarkMode}=useContext(GeneralContext) 
 
    return (
        <>
            <main className="container-error-page">
                <div className="container-error-page__left venn" role="img" aria-label="404 Venn Diagram">
                    <div className="venn__bubble venn__bubble--left" aria-hidden="true"></div>
                    <div className="venn__bubble venn__bubble--right" aria-hidden="true"></div>
                    <p className="venn__text venn__text--left" aria-describedby="venn-left">We broke Something</p>
                    <p className="venn__text venn__text--center" aria-describedby="venn-center">404</p>
                    <p className="venn__text venn__text--right" aria-describedby="venn-right">You cannot type</p>
                    <span id="venn-left" className="sr-only">Left side of venn diagram</span>
                    <span id="venn-center" className="sr-only">Intersect side of venn diagram</span>
                    <span id="venn-right" className="sr-only">Right side of venn diagram</span>
                </div>
                <div className="wrap">
              <Link to={'/'}> <button className="error-button">Go Back</button></Link> 
            </div>
                <div className="container-error-page__right desc">
                    <h1 className={`desc__head ${isDarkMode ? 'dark' : ''}`}>Error: 404 - Page Not Found</h1>
                    <div className={`desc__body ${isDarkMode ? 'dark' : ''}`}>
                        <p>You might be here because:</p>
                        <ul>
                            <li>The page has moved</li>
                            <li>The page no longer exists</li>
                            <li>You were looking for your kittens and got lost</li>
                            <li>You like 404 pages</li>
                        </ul>
                    </div>
                </div>
            </main>
        </>

    )
}

export default ErrorPage
