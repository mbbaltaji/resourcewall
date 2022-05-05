$(document).ready(() => {
  const $container = $("#resource-container");

  const loadResources = function () {
    $.ajax({
      url: "/api/resources",
      method: "GET",
      dataType: "json",
      success: (data) => {
        const resourceElements = data.resources.map(createResourceItem);
        $container.append(resourceElements);
        return data;
      },
      error: (xhr, status, errorMessage) => {
        console.log("error recieved", status, errorMessage);
      }
    }).then(data => {
      data.resources.map(likeHandler)
    })
  };

  const createResourceItem = function (resource) {
    const categories = {
      Sports: "fa-solid fa-basketball",
      Educational: "fa-solid fa-graduation-cap",
      Art: "fa-solid fa-palette",
      Coding: "fa-solid fa-code",
      Cooking: "fa-solid fa-utensils",
      Music: "fa-solid fa-music",
      Travel: "fa-solid fa-bus"
    };

    const icon = categories[resource.category];
    const img = `http://api.pagepeeker.com/v2/thumbs.php?size=m&code={code}&refresh={refresh}&wait={wait}&url=${resource.url}`;

    const $resourceCard = $(`
    <div id="card" class="card" style="width: 18rem;">
      <img class="card-img-top" src="${img}" alt="Card image cap">
      <div id="card-footer" class="card-body">
        <div >
          <div class="title">
            <h5 class="card-title">${resource.title}</h5>
            <i class="${icon}"></i>
          </div>
            <p class="card-text">${resource.description}</p>
        </div>
        <div>
        <hr>
            <footer>
              <div id="icons-footer">
                <a id="link-btn" href="${resource.url}"><i class="fa-solid fa-link"></i></a>
                <button type="button" class="like-btn" data-id=${resource.id}>
                <span id=${resource.id} class="link-icons material-symbols-outlined">favorite</span>
                </button>
              </div>
            </footer>
        </div>
        </div>
    </div>
    `);

  return $resourceCard;
  };

  const searchButtonHandler = function (event) {

    if(event.keyCode === 13){
      // store the value of search input field
      const $val = '%' + $("#search-input").val() + '%';
      console.log($val);
      // make a post request to /api/resources
      $.ajax({
        url: "/api/resources",
        method: "POST",
        dataType: "json",
        data: { searchQuery: $val }, //object containing search input value
        success: (data) => {
          console.log(data);
          const resourceElements = data.resources.map(createResourceItem);
          $container.empty();
          $container.append(resourceElements);
        },
        error: (xhr, status, errorMessage) => {
          console.log("error recieved", status, errorMessage);
        },
      });
    } else if(event.keyCode === 27){
      $container.empty();
      loadResources();
      $("#search-input").val("");
    }
    // $.post('/api/resources', {'searchQuery': $val}, (res) => {
    //   const resourceElements = res.resources.map(createResourceItem);
    //   $container.empty();
    //   $container.append(resourceElements);
    // });
  };

  const categorySearchHandler = function () {
    const $val = $("#category").val();

    $.ajax({
      url: "/api/category",
      method: "POST",
      dataType: "json",
      data: { searchQuery: $val },
      success: (data) => {
        const resourceElements = data.resources.map(createResourceItem);
        $container.empty();
        $container.append(resourceElements);
      },
      error: (xhr, status, errorMessage) => {
        console.log("error recieved", status, errorMessage);
      },
    });
  };

  const addResourceHandler = function () {
    const $inputTitle = $("#input-title").val();
    const $inputUrl = $("#input-url").val();
    const $inputDescription = $("#input-description").val();
    const $inputCategory = $("#category-select").val();


    const queryObject = {
      user_id: 1,
      title: $inputTitle,
      url: $inputUrl,
      description: $inputDescription,
      category: $inputCategory,
    };

    console.log(queryObject);

    $.ajax({
      url: "/api/addresource",
      method: "POST",
      dataType: "json",
      data: queryObject,
      success: (data) => {
        const newResource = data.resources.map(createResourceItem);
        $container.prepend(newResource);
      },
      error: (xhr, status, errorMessage) => {
        console.log("error recieved", status, errorMessage);
      }
    })
  }

  const myResourceHandler = function () {
    $.ajax({
      url: "/api/myresources",
      method: "GET",
      dataType: "json",
      success: (data) => {
        const myResources = data.resources.map(createResourceItem);
        $container.empty();
        $container.append(myResources);
      },
      error: (xhr, status, errorMessage) => {
        console.log("error recieved", status, errorMessage);
      }

    })
  }

  const favouritesHandler = function () {
    $.ajax({
      url: "/api/favourites",
      method: "GET",
      dataType: "json",
      success: (data) => {
        const favourites = data.favourites.map(createResourceItem);
        $container.empty();
        $container.append(favourites);
      },
      error: (xhr, status, errorMessage) => {
        console.log("error recieved", status, errorMessage);
      }
    })
  }

  const likeButtonHandler = function(e) {
    const resource_id = $(e.currentTarget).data().id;



    $.ajax({
      url: "/api/favourites",
      method: "POST",
      data: {resource_id: resource_id},
      success: (data) => {
        $(e.target).css("color", "red");
      },
      error: (xhr, status, errorMessage) => {
        console.log("error recieved", status, errorMessage);
      }
    })
  }

  const likeHandler = function (resource) {
    $.ajax({
      url: "/api/favourites",
      method: "GET",
      success: (data) => {
        return data;
      },
      error: (xhr, status, errorMessage) => {
        console.log("error recieved", status, errorMessage);
      }
    })
    .then( data => {
        for (const instance of data.favourites) {
          if (resource.id === instance["id"]) {
            $(`#${instance["id"]}`).addClass("liked");
          } else {
            continue;
          }
        }
    });

  }

  loadResources();

  // $("#search-btn").on("click", searchButtonHandler);
  $("#all-resources-btn").on("click", () =>{
    $("#resource-container").empty();
    loadResources();
  });
  $("#search-input" ).on('keyup', searchButtonHandler);
  $("#category").change(categorySearchHandler);
  $("#add-resource-btn").on("click", addResourceHandler);
  $("#my-resources-btn").on("click", myResourceHandler);
  $("#favourites-btn").on("click", favouritesHandler);
  $("body").on("click", ".like-btn", likeButtonHandler);
  //$(".like-btn").on("click", likeButtonHandler);
});
