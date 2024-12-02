const last_update = "November, 2024";

function toggleCollapsible(element) {
    const collapsibleContent = element.parentElement.parentElement.querySelector('.collapsible-content');
    if (collapsibleContent.style.display === 'none' || collapsibleContent.style.display === '') {
        collapsibleContent.style.display = 'block';
        element.innerText = 'Show Less';
    } else {
        collapsibleContent.style.display = 'none';
        element.innerText = 'Show More';
    }
}