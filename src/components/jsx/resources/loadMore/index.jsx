import { Button } from "react-bootstrap";
import usePage from "../../store/page";
import { shallow } from "zustand/shallow";
import useApi from "../../store/api";

function EnableDisable(nxtPage) {
  return Boolean(nxtPage) ? false : true;
}

function LoadMore() {
    const { nextPage, prevPage, updateUrl } = usePage(
      (state) => ({
        nextPage: state.nextPage,
        prevPage: state.prevPage,
        updateUrl: state.updateUrl,
      }),
      shallow
    );

    const { extendVenues } = useApi(
      (state) => ({
        extendVenues: state.extendVenues,
      }),
      shallow
    );
  
    const obj = [{
            "id": "9b4ce61d-823a-46fc-a796-346de647dd01",
            "name": "Innerdalen",
            "description": "Escape to serenity in this charming house nestled in the heart of Innerdal, Norway's most picturesque valley. Surrounded by towering mountains and lush greenery, our retreat offers the perfect blend of tranquility and adventure. Whether you're looking to hike the nearby trails, explore pristine lakes, or simply unwind with a book by the fireplace, this is your ideal getaway.",
            "media": [
                {
                    "url": "https://images.unsplash.com/photo-1531252582519-2d7e6795be96?q=80&w=2664&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    "alt": "innerdalen"
                }
            ],
            "price": 399,
            "maxGuests": 4,
            "rating": 5,
            "created": "2024-09-13T07:46:32.643Z",
            "updated": "2024-09-26T08:55:47.563Z",
            "meta": {
                "wifi": false,
                "parking": true,
                "breakfast": true,
                "pets": true
            },
            "location": {
                "address": "Viromdalsvegen 988",
                "city": "Ålvundeid",
                "zip": "6620",
                "country": "Norway",
                "continent": "Europe",
                "lat": 62.73841666666667,
                "lng": 8.709527777777778
            },
            "bookings": [
                {
                    "id": "b0f7051d-3664-4ed2-b344-a5b391244ffb",
                    "dateFrom": "2024-09-21T22:00:00.000Z",
                    "dateTo": "2024-09-28T22:00:00.000Z",
                    "guests": 2,
                    "created": "2024-09-15T07:37:33.261Z",
                    "updated": "2024-09-15T07:37:33.261Z",
                    "customer": {
                        "name": "Bjarne",
                        "email": "bjarne@stud.noroff.no",
                        "bio": "Hello! I am Bjarne.",
                        "avatar": {
                            "url": "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=400&w=400",
                            "alt": "User Avatar"
                        },
                        "banner": {
                            "url": "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=500&w=1500",
                            "alt": "Banner Image"
                        }
                    }
                },
                {
                    "id": "6d7f8df8-058e-4929-82c5-67658a950a99",
                    "dateFrom": "2024-09-21T22:00:00.000Z",
                    "dateTo": "2024-09-28T22:00:00.000Z",
                    "guests": 1,
                    "created": "2024-09-15T11:31:16.138Z",
                    "updated": "2024-09-15T11:31:16.138Z",
                    "customer": {
                        "name": "Ulven",
                        "email": "ulven@stud.noroff.no",
                        "bio": "Jeg er en ulv?",
                        "avatar": {
                            "url": "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png",
                            "alt": "User Avatar"
                        },
                        "banner": {
                            "url": "https://www.bu.edu/globalprograms/files/2015/05/banner-placeholder.png",
                            "alt": "Banner Image"
                        }
                    }
                },
                {
                    "id": "695a0ce5-101d-4a36-a4ea-cc49f20f5610",
                    "dateFrom": "2024-10-13T22:00:00.000Z",
                    "dateTo": "2024-10-15T21:59:59.999Z",
                    "guests": 3,
                    "created": "2024-09-29T10:05:49.063Z",
                    "updated": "2024-09-29T10:36:14.414Z",
                    "customer": {
                        "name": "narasimha2",
                        "email": "narasimha2@stud.noroff.no",
                        "bio": "I am Lord Shiva, I live in Kailash.",
                        "avatar": {
                            "url": "https://miro.medium.com/v2/resize:fit:1400/1*W03Biqj5tgwFsWT9uEL39w.jpeg",
                            "alt": "Kailash"
                        },
                        "banner": {
                            "url": "https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcSNPtUTWPlqBgqQ2Bwo07sV_nsGSMs-B6LFa7RW-dJ1Kxr2whZgWAzwbkeNUKhwHan6BjMtLfgbi8Rs7zEvRsojYsFrD344Mi8TjSv2Dg",
                            "alt": "Kailash"
                        }
                    }
                }
            ],
            "_count": {
                "bookings": 3
            }
        }];

  return (
    <div className="d-flex justify-content-between m-2">
      <Button className="btn-secondary" onClick={() => updateUrl(prevPage)} disabled={EnableDisable(prevPage)} aria-label="previous page">Prev page</Button>
      <Button className="btn-secondary" onClick={() => extendVenues(obj)} disabled={EnableDisable(nextPage)} aria-label="next page">Load More</Button>
      <Button className="btn-secondary" onClick={() => updateUrl(nextPage)} disabled={EnableDisable(nextPage)} aria-label="next page">Next page</Button>
    </div>
  );
}

export default LoadMore;
