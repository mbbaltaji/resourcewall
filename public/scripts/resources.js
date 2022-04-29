const categories = {
  sports: "fa-solid fa-basketball",
  educational: "fa-solid fa-graduation-cap",
  art: "fa-solid fa-palette",
  coding: "fa-solid fa-code",
  cooking: "fa-solid fa-utensils",
  music: "fa-solid fa-music",
  travel: "fa-solid fa-bus"
};

const createResourceItem = function (resource) {
  const icon = categories[resource.category];
  console.log(icon);
  //return $("<li>").text(`${resource.url} - ${resource.title} - ${resource.description} - ${resource.created_at}`);
  const img = `http://api.pagepeeker.com/v2/thumbs.php?size=m&code={code}&refresh={refresh}&wait={wait}&url=${resource.url}`;
  const $resourceCard = $(`<div class="card" style="width: 18rem;">
  <img class="card-img-top" src="${img}" alt="Card image cap">
  <div class="card-body">
  <div class="title">
    <h5 class="card-title">${resource.title}</h5>
    <i class="${icon}"></i>
  </div>
    <p class="card-text">${resource.description}</p>
    <a href="${resource.url}" class="btn btn-primary">${resource.title}</a>
  </div>
</div>`);

  return $resourceCard;
};


$(document).ready(() => {
  const $container = $("#resource-container");
    $.ajax({
    url: "/api/resources",
    method: "GET",
    dataType: "json",
    success: (data) => {
      const resourceElements = data.resources.map(createResourceItem);
      $container.append(resourceElements);
    },
    error: (xhr, status, errorMessage) => {
      console.log("error recieved", status, errorMessage);
    },
  });

  // click handler for search button
  $('#search-btn').click(function () {
    // store the value of search input field
    const $val = $('#search-input').val();
    // make a post request to /api/resources
    $.ajax({
      url: '/api/resources',
      method: 'POST',
      dataType: "json",
      data: {'searchQuery': $val},  //object containing search input value
      success: (data) => {
        console.log(data);
      const resourceElements = data.resources.map(createResourceItem);
      $container.empty();
      $container.append(resourceElements);
      },
      error: (xhr, status, errorMessage) => {
        console.log("error recieved", status, errorMessage);
      }
    });
    // $.post('/api/resources', {'searchQuery': $val}, (res) => {
    //   const resourceElements = res.resources.map(createResourceItem);
    //   $container.empty();
    //   $container.append(resourceElements);
    // });
  });

  $('#category-search').click(function () {
    const $val = $('#category').val();

    $.ajax({
      url: '/api/category',
      method: 'POST',
      dataType: "json",
      data: {'searchQuery': $val},
      success: (data) => {
        const resourceElements = data.resources.map(createResourceItem);
        $container.empty();
        $container.append(resourceElements);
      },
      error: (xhr, status, errorMessage) => {
        console.log("error recieved", status, errorMessage);
      }
    })
  })
});
