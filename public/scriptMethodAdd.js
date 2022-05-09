const $playList=document.querySelector('.playlist');
//добавление треков на страницу моей медиатеки
 Array.from($playList.querySelectorAll('.item-actions_type_add')).forEach((button)=>{
    button.addEventListener('click',(event)=>
    {  
     const value = event.target.closest('.li');
     const temp=value.children[2];
     //создаем узел
     const modifiedTodo=document.createElement("button");
     modifiedTodo.type="button";
     modifiedTodo.textContent="Удалить";
     modifiedTodo.className="item-actions_action item-actions_type_delete";
     //заменяем для добавления на страницу с нужной кнопкой
     value.replaceChild(modifiedTodo,value.children[2]);
     const template=`</li>
       <li class="li"> 
       ${value.innerHTML}
       </li>
       `;
       //возвращаем значение кнопки
       value.replaceChild(temp,value.children[2]);
       let count=localStorage.length;
      localStorage.setItem(value.children[0].innerText,template);
      let message="";
      
      //для всплывающего окна
      if(count==localStorage.length)
      {
      message=` <div id="window" class="div">
      Этот трек уже находится в вашей медиатеке<br>
      <button type="button" class="item-actions_type_OK">Хорошо</button>
      </div>`
      }
      else
      {
        message=` <div id="window" class="div">
        Трек успешно добавлен<br>
        <button type="button" class="item-actions_type_OK">Хорошо</button>
        </div>`
      }
    ``
      $playList.insertAdjacentHTML('beforeend',message);
    })
})
 const deletemusic=(element)=>{
  element.closest('.div').remove();
}
 $playList.addEventListener('click',(event)=>{
  if(event.target.classList.contains('item-actions_type_OK'))
  {
      const lie=event.target.closest('.div');
      deletemusic(event.target);
  }
})


