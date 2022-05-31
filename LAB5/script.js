fetch('product.json')
.then(response => response.json())
.then(function(items){
    startPage(items)
})

let counter = 3;
document.addEventListener('DOMContentLoaded', load);
window.onscroll = () =>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight){
        load();
    }
};

function startPage(items){
    const uniforms = document.querySelector('.flex-uniforms');
    const teams = document.querySelector('#teams')
    const searched = document.querySelector('#search');
    const btn = document.querySelector('#search-button');

    let recentTeam = teams.value;
    let recentSearch = "";

    let selected = [];
    let output = items;
    showResult();
    output = [];

    btn.addEventListener('click', selectTeam);

    function selectTeam(event){
        event.preventDefault();

        selected = [];
        output = [];
        if(recentTeam === teams.value && recentSearch === searched.value){
            return;
        } 
        else{
            recentTeam = teams.value;
            recentSearch = searched.value;
            if(recentTeam === 'All'){
                selected = items;
            } 
            else{
                selected = items.filter(item => item.team === recentTeam);
            }
            selectItems();
        }
    }

    function selectItems(){
        if(searched.value === ""){
            output = selected;
        } 
        else{
            for(let i = 0; i < selected.length; i++){
                if(selected[i].name.toLowerCase().includes(searched.value.toLowerCase())){
                    output.push(selected[i]);
                }
            }
        }
        showResult();
    }
    
    function showResult(){        
        while (uniforms.childElementCount != 0){
            uniforms.removeChild(uniforms.firstChild);
        }
        for(let i = 0; i < 3; i++){
            showItems(output[i].img, output[i],i);
        }
    }
    
    function showItems(dir, item, i){
        const box = document.createElement('section');
        const click = document.createElement('div');
        const itemName = document.createElement('p');
        const price = document.createElement('p');
        const image = document.createElement('img');

        click.setAttribute('class', 'info');
        click.id = i;
        click.style.opacity = "0";
        click.onclick = function(){
            let clickedId = document.getElementById(this.id);
            if(clickedId.style.opacity === "0"){
                clickedId.style.opacity = "1";
            } 
            else if(clickedId.style.opacity === "1"){
                clickedId.style.opacity = "0";
            }
        }

        itemName.textContent = item.name;
        price.textContent = item.price;
        image.src = dir;
        image.alt = item.name;

        uniforms.appendChild(box);
        box.appendChild(click);
        box.appendChild(image);
        click.appendChild(itemName);
        click.appendChild(price)
    }
}

function load(){
    const uniforms = document.querySelector('.flex-uniforms');

    let start = counter;
    let end = start + 1;
    counter = end;

    fetch('product.json')
    .then(response => response.json())
    .then(function(items){
        for(let i = start; i < end; i++){
            const box = document.createElement('section');
            const click = document.createElement('div');
            const itemName = document.createElement('p');
            const price = document.createElement('p');
            const image = document.createElement('img');
    
            click.setAttribute('class', 'info');
            click.id = i;
            click.style.opacity = "0";
            click.onclick = function(){
                var x = document.getElementById(this.id);
                if(x.style.opacity === "0"){
                    x.style.opacity = "1";
                } 
                else if(x.style.opacity === "1"){
                    x.style.opacity = "0";
                } 
            }

            itemName.textContent = items[i].name;
            price.textContent = items[i].price;
            image.src = items[i].img;
            image.alt = items[i].name;
    
            uniforms.appendChild(box);
            box.appendChild(click);
            click.appendChild(itemName);
            click.appendChild(price);
            box.appendChild(image);
        }
    })
};