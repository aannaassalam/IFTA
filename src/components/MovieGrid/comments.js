var elements = document.querySelectorAll('.Linkify');

for(let i = 0;i<elements.length;i++){
    let element = elements[i];
    let text =  element.innerHTML;
    let data = text.split(' voted for ');
    let comment = data[1].split('\n');
    element.innerHTML = `<strong><b>${data[0]}</b></strong> voted for <span style="font-weight:normal ; color:grey">${comment[0]}</span>\n${comment[1]}`
}