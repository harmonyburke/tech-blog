const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#title').value.trim();
  const blogPost = document.querySelector('#post').value.trim();


  if (title && post  {
    const response = await fetch(`/api/blogPost`, {
      method: 'POST',
      body: JSON.stringify({ title, blogPost }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/homepage');
    } else {
      alert('Failed to load page');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('id')) {
    const id = event.target.getAttribute('id');

    const response = await fetch(`/api/blogPost/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/login');
    } else {
      alert('Failed to delete post');
    }
  }
};

document
  .querySelector('.new-post-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.post-list')
  .addEventListener('click', delButtonHandler);
