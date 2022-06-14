//Компонент для отображение футера
/*
* @return {HTMLElement} Footer 
*/
export default function Footer()
{
    return(
<footer className="footer">
       <p>©Tensor 2022</p>
       <nav className="footer_navigation" tabIndex="0">
         <a className="transition" href="https://github.com/AleksandrTabanakov">&#128073;Github</a>
         <a className="transition" href="https://vk.com/virussanya" target="_blank" rel="noopener"> &#128073;VK</a>
       </nav>
     </footer>
    );
} 