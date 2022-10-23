/*Pritpal Singh Grewal
 300961555
 Express Portfolio
 30th September, 2022*/






(function(){
    function Start()
    {
        console.log("App Started....")

      let deleteButtons =  document.querySelectorAll('.btn-danger')

      for(button of deleteButtons)
      {
        button.addEventListener('click',(event)=>{
            if(!confirm("Are you sure?"))
            {
                event.preventDefault();
                window.location.assign('/business-contact-list');
            }
        });
      }
    }
    window.addEventListener("load",Start);
})();