const markdownInput = document.querySelector("#markdown-input");
const htmlOutput = document.querySelector("#html-output");
const preview = document.querySelector("#preview");

const headingRegex = /^(#{1,3}) (.+)/gm;
const boldRegex = /(\*\*|__)(.+?)\1/gm;
const italicRegex = /(\*|_)(.+?)\1/gm;
const imgRegex = /!\[(.+?)\]\((.+?)\)/gm;
const linkRegex = /\[(.+?)\]\((.+?)\)/gm;
const bQuotesRegex= /^> (.+)/gm;

function convertMarkdown()
{
    let result=markdownInput.value.replace(headingRegex, (match, hashes, text)=>
    {
        const level=hashes.length;
        return `<h${level}>${text}</h${level}>`
    })

    result=result.replace(boldRegex, (match, marker, text)=>
    {
        return `<strong>${text}</strong>`
    })

    result=result.replace(italicRegex, (match,tilted, text)=>
    {
        return `<em>${text}</em>`
    })

    result=result.replace(imgRegex, (match, altText, imgSrc)=>
    {
        return `<img src="${imgSrc}" alt="${altText}">`
    })

    result=result.replace(linkRegex, (match, linkText, linkUrl)=>
    {
        return `<a href="${linkUrl}">${linkText}</a>`
    })

    result=result.replace(bQuotesRegex, (match, text)=>
    {
        
        return `<blockquote>${text}</blockquote>`
    })
    
    return result;
}

markdownInput.addEventListener("input" ,()=>
{
    let inputText=convertMarkdown();
    htmlOutput.textContent = inputText;
    preview.innerHTML = inputText;
})