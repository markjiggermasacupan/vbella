$(function(){
    let preloader = `
    <div class="page-preloader" role="document" id="page-preloader">
        <div class="wrapper">
            <div class="preloader text-center ">
                <img src="./assets/VBella.png" alt="" width="100">
                
                <p class="text-white-50 mt-3">Setting things up, please wait... </p>
                <div class="spinner-border spinner-border-sm text-white-50 mt-1" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    </div>`;
    $("body").addClass("preloader-open");
    $("body").append(preloader)
})