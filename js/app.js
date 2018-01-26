// global selecters used throught the project
const $studentList = document.querySelector('.student-list');
// global selecters used throught the project
const $searchDivContainer = document.querySelector('div.page-header');
// Dynamically specify how many students to show per page (if variable set to 20 it will list 20 students per page)
const studentsPerPage = 10;

// function called on init, which hides if the number of stundets on the page in total is greater then th studentsPerPage variavle
const hideStudents = () => {
    if($studentList.children.length > studentsPerPage) {
        // counting the number of paginations shown
        let pageCount = Math.ceil($studentList.children.length / studentsPerPage);
        //calling the function to add the pagination dynamically
        appendPagination(pageCount);
        // calling the function to show initial student list
        showStudents(studentsPerPage);
    }
}

// easy function just appending the pagination based on the pageCount calculated in the hideStudents function
const appendPagination = pageCount => {
    if(!document.querySelector('div.pagination')) $studentList.insertAdjacentHTML( 'afterend', '<div class="pagination"><ul></ul></div>' );
    const $pagenitionUl = document.querySelector('div.pagination > ul');
    $pagenitionUl.innerHTML = '';
    for (let i = 1; i <= pageCount; i++) {
        let activeClass = '';
        if (parseInt(i) == 1)  activeClass = "active";
        $pagenitionUl.insertAdjacentHTML('beforeend','<li><a class="'+activeClass+' page-'+i+'" href="#" onclick="showStudents('+i*studentsPerPage+'); return false;">'+i+'</a></li>');


    }
}
// function which displays the student list divided by the pagination
const showStudents = activePage => {
    $studentList.style.display = 'none';
    const arr = $studentList.children;
    // setting the default page view
    let from = activePage-studentsPerPage;
    let to = activePage;
    // selecting the active pagination
    let activePagination = document.querySelector('.page-'+activePage/studentsPerPage);
    // if the it contains the class active then remove it and apped it to the clicked one
     if(!activePagination.classList.contains('active')) {
         if(document.querySelector('.pagination .active').classList.contains('active')) {document.querySelector('.pagination .active').classList.remove("active"); }
         activePagination.classList.add("active");
     }
    // calculating which page to show
    if(activePage == studentsPerPage) {
        from = 0; to = activePage;
    }
    else if(activePage > $studentList.children.length) {
        from = Math.floor($studentList.children.length / 10) * 10;
        to = $studentList.children.length;
    }
    // looping through the students and hiding/showing the proper ones inside the selected range
    for (let i = 0; i < $studentList.children.length; i++) {
        if (from <= i && to > i) {
            $studentList.children[i].style.display = 'block';
        }
        else {
            $studentList.children[i].style.display = 'none';
        }
    }
    //showing the whole student block
    $studentList.style.display = 'block';

}
// easy function where we append the search dynamically
const appendSearch = () => {
    $searchDivContainer.insertAdjacentHTML('beforeend','<div class="student-search"> <input placeholder="Search for students..."> <button>Search</button> </div>')
    document.querySelector('.student-search button').addEventListener('click',function () {
        searchStudents(document.querySelector('.student-search input').value);
    });
}
// function to search the students
const searchStudents = searchString => {
    // remove no-result div if exists
    if(document.contains(document.querySelector('.no-results'))) document.querySelector('.no-results').remove();
    // cheking the length of the search string if its bigger than 0
    if(searchString.length > 0) {
        // add a class wich tells us that the search is active
        if(!document.querySelector('.student-search').classList.contains('search-active')) document.querySelector('.student-search').classList.add("search-active");
        $studentList.style.display = 'none';
        let resultCount = 0;
        // looping throught the elements and comparing the search string with the student titles and email and showing/hiding the proper ones
        for (let i = 0; i < $studentList.children.length; i++) {
            let studentName = $studentList.children[i].querySelector('h3').innerHTML;
            let studentEmail = $studentList.children[i].querySelector('span.email').innerHTML;

            if(studentName.indexOf(searchString) !== -1 || studentEmail.indexOf(searchString) !== -1 ) {
                $studentList.children[i].style.display = 'block';
                resultCount++;
            }
            else {
                $studentList.children[i].style.display = 'none';
            }
        }
        // if no results were found we show a no found message
        if(resultCount == 0 ) {
            $studentList.insertAdjacentHTML( 'afterend', '<div class="no-results">Sorry we didn\'t found any students matching your searched string "<span style="font-weight: bold">'+searchString+'</span>"</div>');
        }
        // hiding the pagination
        document.querySelector('.pagination ').style.display = "none";
        // displaying the whole student block
        $studentList.style.display = 'block';
    }
    else {
        // if the search string is smaller empty, checking if the search was previously active and if yes reseting the pagination and student list
        if(document.querySelector('.student-search').classList.contains('search-active')) {
            document.querySelector('.student-search').classList.remove("search-active");
            document.querySelector('.pagination ').style.display = "block";
            hideStudents();
        }
    }
}
// run initial functions
hideStudents();
appendSearch();