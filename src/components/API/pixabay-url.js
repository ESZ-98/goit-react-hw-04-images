export const apiUrl = (querry, page, perPage) => {
    let url = `?key=35303248-67ec5a4fab42eff68b9e675f4&q=${querry}&image_type=photo&orientation=horizontal&page=${page}&per_page=${perPage}`;
    return url;
}