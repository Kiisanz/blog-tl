import Image from "../components/Image";
import Input from "../components/Input";
import CloudTag from "../components/CloudTag";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  IconArrowRight,
  IconCalendarMonth,
  IconThumbUpFilled,
} from "@tabler/icons-react";

export default function Homepage() {
  const [posts, setPosts] = useState([]);
  const getPosts = async () => {
    try {
      let response = await axios.get(
        "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=9e5dc47d6b7e468dbc03b9154595c236",
        {
          params: {
            pageSize: 3,
          },
        }
      );
      setPosts(response.data.articles);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getPosts();
  }, []);
  return (
    <div>
      {/* Header Section */}
      <div className="flex flex-col items-center w-full gap-4 px-12 py-8 lg:gap-8 lg:py-12">
        <h1 className="text-lg font-bold lg:text-3xl">Featured Articles</h1>
        <form action="" className="max-w-[720px] w-full">
          <Input />
        </form>
      </div>

      {/* Jumbotron */}
      <div className="flex flex-col w-full px-6 pb-8 lg:pb-16 lg:flex-row gap-x-3 lg:px-24">
        <div className="flex flex-col w-full gap-3 pt-4 pb-5 lg:w-1/2">
          <Image
            className={
              "object-cover 2xl:h-96 h-48 lg:h-80 md:h-60 w-full rounded-xl"
            }
          />
          <h1 className="text-xl font-semibold text-gray-700 truncate">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia,
            ipsum.
          </h1>
          <p className="text-sm text-gray-400 line-clamp-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque fuga
            vitae porro suscipit quasi delectus quae molestiae itaque corrupti
            et fugiat tenetur, cum hic aspernatur! Eius explicabo rerum nihil
            qui? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas
            officiis consequuntur quisquam perferendis aspernatur quod
            voluptatum molestiae illum? Neque, quibusdam. Lorem ipsum dolor, sit
            amet consectetur adipisicing elit. Nisi impedit quia officiis ex cum
            quaerat magni sed hic voluptas vel.
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image
                className={"object-cover h-8 w-8 rounded-full"}
                height={25}
                width={25}
              />
              <div className="flex flex-col">
                <p className="text-sm font-semibold text-gray-600">John Doe</p>
                <span className="text-xs text-gray-400">2 Feb 2024</span>
              </div>
            </div>
          </div>
        </div>
        {/* POST LIST */}

        <div className="flex flex-col w-full gap-2 lg:px-3 lg:w-1/2">
          {posts.map((post, index) => {
            return (
              <div key={index}>
                <div className="flex justify-between py-4 ">
                  <CloudTag text={post.source.name} />
                  <div className="flex items-center gap-1 text-gray-600">
                    <IconThumbUpFilled size={20} />
                    <span className="text-xs font-medium 2xl:text-sm">
                      Likes 23
                    </span>
                  </div>
                </div>
                <NavLink
                  to={post.url}
                  className="font-semibold text-gray-700 truncate 2xl:text-xl text-md"
                >
                  <p className="truncate">{post.title}</p>
                </NavLink>
                <p className="text-xs text-gray-400 2xl:text-sm line-clamp-3">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quisquam, dignissimos corrupti. Quis officiis molestiae ipsum
                  maiores doloremque quo repellat molestias, illo commodi iste
                  iusto autem facere doloribus porro, dignissimos vitae
                  accusamus. Tempore magni consequatur saepe commodi soluta,
                  voluptas quos officiis quaerat aut! Repudiandae rerum
                  reprehenderit similique quo dolorum id vel!
                </p>
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <Image
                      className={
                        "object-cover 2xl:h-8 h-6 w-6 2xl:w-8 rounded-full"
                      }
                      height={25}
                      width={25}
                    />
                    <div className="flex flex-col">
                      <p className="text-xs font-semibold text-gray-600 2xl:text-sm">
                        {post.author}
                      </p>
                      <span className="text-xs text-gray-400">
                        {post.publishedAt}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="px-6 lg:px-24">
        <div className="flex items-center justify-between w-full py-1 pr-3 border-b-2">
          <h1 className="text-yellow-600 underline decoration-yellow-600 decoration-4 underline-offset-8">
            Science and Technology
          </h1>
          <NavLink
            to={"/"}
            className={
              "text-gray-600 text-sm hover:text-gray-800 transition-all duration-300 ease-in-out"
            }
          >
            See all
          </NavLink>
        </div>
        <div className="flex flex-col justify-center w-full gap-8 py-8 md:px-8 md:flex-row">
          <div className="flex flex-col w-full gap-2 md:w-1/3">
            <div className="relative">
              <Image
                className={
                  "object-cover 2xl:h-72 h-48 lg:h-60 w-full rounded-xl"
                }
              />
              <div className="absolute -bottom-3 left-4">
                <CloudTag text="Science and Tech"></CloudTag>
              </div>
            </div>
            <NavLink
              to={"/"}
              className="pt-4 font-semibold text-gray-700 truncate 2xl:text-xl text-md"
            >
              <p className="truncate">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore
                praesentium ex distinctio ipsam! Inventore dolore, sed, fugit
                nesciunt libero magnam quisquam distinctio accusantium pariatur
                aspernatur voluptatibus consequuntur et dolores nisi.
              </p>
            </NavLink>
            <p className="text-xs text-gray-400 2xl:text-sm line-clamp-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              dignissimos corrupti. Quis officiis molestiae ipsum maiores
              doloremque quo repellat molestias, illo commodi iste iusto autem
              facere doloribus porro, dignissimos vitae accusamus. Tempore magni
              consequatur saepe commodi soluta, voluptas quos officiis quaerat
              aut! Repudiandae rerum reprehenderit similique quo dolorum id vel!
            </p>
            <div className="flex items-center justify-between pt-2 border-t-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Image
                    className={
                      "object-cover 2xl:h-8 h-6 w-6 2xl:w-8 rounded-full"
                    }
                    height={25}
                    width={25}
                  />
                  <p className="text-xs font-semibold text-gray-600 2xl:text-sm">
                    John Doe
                  </p>
                </div>
              </div>
              <span className="flex items-center gap-2 text-xs text-gray-400">
                <IconCalendarMonth className={"text-yellow-600"} size={15} />2
                Feb 2024
              </span>
            </div>
          </div>
          <div className="flex flex-col w-full gap-2 md:w-1/3">
            <div className="relative">
              <Image
                className={
                  "object-cover 2xl:h-72 h-48 lg:h-60 w-full rounded-xl"
                }
              />
              <div className="absolute -bottom-3 left-4">
                <CloudTag text="Science and Tech"></CloudTag>
              </div>
            </div>
            <NavLink
              to={"/"}
              className="pt-4 font-semibold text-gray-700 truncate 2xl:text-xl text-md"
            >
              <p className="truncate">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore
                praesentium ex distinctio ipsam! Inventore dolore, sed, fugit
                nesciunt libero magnam quisquam distinctio accusantium pariatur
                aspernatur voluptatibus consequuntur et dolores nisi.
              </p>
            </NavLink>
            <p className="text-xs text-gray-400 2xl:text-sm line-clamp-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              dignissimos corrupti. Quis officiis molestiae ipsum maiores
              doloremque quo repellat molestias, illo commodi iste iusto autem
              facere doloribus porro, dignissimos vitae accusamus. Tempore magni
              consequatur saepe commodi soluta, voluptas quos officiis quaerat
              aut! Repudiandae rerum reprehenderit similique quo dolorum id vel!
            </p>
            <div className="flex items-center justify-between pt-2 border-t-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Image
                    className={
                      "object-cover 2xl:h-8 h-6 w-6 2xl:w-8 rounded-full"
                    }
                    height={25}
                    width={25}
                  />
                  <p className="text-xs font-semibold text-gray-600 2xl:text-sm">
                    John Doe
                  </p>
                </div>
              </div>
              <span className="flex items-center gap-2 text-xs text-gray-400">
                <IconCalendarMonth className={"text-yellow-600"} size={15} />2
                Feb 2024
              </span>
            </div>
          </div>
          <div className="flex flex-col w-full gap-2 md:w-1/3">
            <div className="relative">
              <Image
                className={
                  "object-cover 2xl:h-72 h-48 lg:h-60 w-full rounded-xl"
                }
              />
              <div className="absolute -bottom-3 left-4">
                <CloudTag text="Science and Tech"></CloudTag>
              </div>
            </div>
            <NavLink
              to={"/"}
              className="pt-4 font-semibold text-gray-700 truncate 2xl:text-xl text-md"
            >
              <p className="truncate">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore
                praesentium ex distinctio ipsam! Inventore dolore, sed, fugit
                nesciunt libero magnam quisquam distinctio accusantium pariatur
                aspernatur voluptatibus consequuntur et dolores nisi.
              </p>
            </NavLink>
            <p className="text-xs text-gray-400 2xl:text-sm line-clamp-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              dignissimos corrupti. Quis officiis molestiae ipsum maiores
              doloremque quo repellat molestias, illo commodi iste iusto autem
              facere doloribus porro, dignissimos vitae accusamus. Tempore magni
              consequatur saepe commodi soluta, voluptas quos officiis quaerat
              aut! Repudiandae rerum reprehenderit similique quo dolorum id vel!
            </p>
            <div className="flex items-center justify-between pt-2 border-t-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Image
                    className={
                      "object-cover 2xl:h-8 h-6 w-6 2xl:w-8 rounded-full"
                    }
                    height={25}
                    width={25}
                  />
                  <p className="text-xs font-semibold text-gray-600 2xl:text-sm">
                    John Doe
                  </p>
                </div>
              </div>
              <span className="flex items-center gap-2 text-xs text-gray-400">
                <IconCalendarMonth className={"text-yellow-600"} size={15} />2
                Feb 2024
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center w-full gap-8 px-4 py-12 md:flex-row">
          <div className="flex flex-col w-full gap-2 md:w-1/2">
            <div className="relative">
              <Image
                className={
                  "object-cover 2xl:h-96 h-48 lg:h-80 w-full rounded-xl"
                }
              />
              <div className="absolute -bottom-3 left-4">
                <CloudTag text="Science and Tech"></CloudTag>
              </div>
            </div>
            <NavLink
              to={"/"}
              className="pt-4 font-semibold text-gray-700 truncate 2xl:text-xl text-md"
            >
              <p className="truncate">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore
                praesentium ex distinctio ipsam! Inventore dolore, sed, fugit
                nesciunt libero magnam quisquam distinctio accusantium pariatur
                aspernatur voluptatibus consequuntur et dolores nisi.
              </p>
            </NavLink>
            <p className="text-xs text-gray-400 2xl:text-sm line-clamp-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              dignissimos corrupti. Quis officiis molestiae ipsum maiores
              doloremque quo repellat molestias, illo commodi iste iusto autem
              facere doloribus porro, dignissimos vitae accusamus. Tempore magni
              consequatur saepe commodi soluta, voluptas quos officiis quaerat
              aut! Repudiandae rerum reprehenderit similique quo dolorum id vel!
            </p>
            <div className="flex items-center justify-between pt-2 border-t-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Image
                    className={
                      "object-cover 2xl:h-8 h-6 w-6 2xl:w-8 rounded-full"
                    }
                    height={25}
                    width={25}
                  />
                  <p className="text-xs font-semibold text-gray-600 2xl:text-sm">
                    John Doe
                  </p>
                </div>
              </div>
              <span className="flex items-center gap-2 text-xs text-gray-400">
                <IconCalendarMonth className={"text-yellow-600"} size={15} />2
                Feb 2024
              </span>
            </div>
          </div>
          <div className="flex flex-col w-full gap-2 md:w-1/2">
            <div className="relative">
              <Image
                className={
                  "object-cover 2xl:h-96 h-48 lg:h-80 w-full rounded-xl"
                }
              />
              <div className="absolute -bottom-3 left-4">
                <CloudTag text="Science and Tech"></CloudTag>
              </div>
            </div>
            <NavLink
              to={"/"}
              className="pt-4 font-semibold text-gray-700 truncate 2xl:text-xl text-md"
            >
              <p className="truncate">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore
                praesentium ex distinctio ipsam! Inventore dolore, sed, fugit
                nesciunt libero magnam quisquam distinctio accusantium pariatur
                aspernatur voluptatibus consequuntur et dolores nisi.
              </p>
            </NavLink>
            <p className="text-xs text-gray-400 2xl:text-sm line-clamp-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              dignissimos corrupti. Quis officiis molestiae ipsum maiores
              doloremque quo repellat molestias, illo commodi iste iusto autem
              facere doloribus porro, dignissimos vitae accusamus. Tempore magni
              consequatur saepe commodi soluta, voluptas quos officiis quaerat
              aut! Repudiandae rerum reprehenderit similique quo dolorum id vel!
            </p>
            <div className="flex items-center justify-between pt-2 border-t-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Image
                    className={
                      "object-cover 2xl:h-8 h-6 w-6 2xl:w-8 rounded-full"
                    }
                    height={25}
                    width={25}
                  />
                  <p className="text-xs font-semibold text-gray-600 2xl:text-sm">
                    John Doe
                  </p>
                </div>
              </div>
              <span className="flex items-center gap-2 text-xs text-gray-400">
                <IconCalendarMonth className={"text-yellow-600"} size={15} />2
                Feb 2024
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="px-6 py-12 bg-gray-100 lg:px-24">
        <div className="flex items-center justify-between w-full py-1 pr-3 border-b-2">
          <h1 className="text-yellow-600 underline decoration-yellow-600 decoration-4 underline-offset-8">
            Bussines and Society
          </h1>
          <NavLink
            to={"/"}
            className={
              "text-gray-600 text-sm hover:text-gray-800 transition-all duration-300 ease-in-out"
            }
          >
            See all
          </NavLink>
        </div>
        <div className="flex w-full gap-8 py-8">
          <div className="flex flex-col w-1/2 gap-3 pb-8 overflow-hidden bg-white rounded-xl">
            <Image
              className={
                "object-cover 2xl:h-96 h-48 lg:h-80 md:h-60 w-full rounded-xl"
              }
            />
            <h1 className="px-8 text-xl font-semibold text-gray-700 truncate">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia,
              ipsum.
            </h1>
            <p className="px-8 text-sm text-gray-400 line-clamp-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque
              fuga vitae porro suscipit quasi delectus quae molestiae itaque
              corrupti et fugiat tenetur, cum hic aspernatur! Eius explicabo
              rerum nihil qui? Lorem ipsum, dolor sit amet consectetur
              adipisicing elit. Quas officiis consequuntur quisquam perferendis
              aspernatur quod voluptatum molestiae illum? Neque, quibusdam.
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi
              impedit quia officiis ex cum quaerat magni sed hic voluptas vel.
            </p>
            <div className="flex items-center justify-between px-8">
              <div className="flex items-center gap-2">
                <Image
                  className={"object-cover h-8 w-8 rounded-full"}
                  height={25}
                  width={25}
                />
                <div className="flex flex-col">
                  <p className="text-sm font-semibold text-gray-600">
                    John Doe
                  </p>
                  <span className="text-xs text-gray-400">2 Feb 2024</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-1/2 gap-8 overflow-hidden rounded-xl">
            <div className="flex flex-col w-full gap-4 p-8 bg-white rounded-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Image
                      className={
                        "object-cover 2xl:h-8 h-6 w-6 2xl:w-8 rounded-full"
                      }
                      height={25}
                      width={25}
                    />
                    <p className="text-xs font-semibold text-gray-600 2xl:text-sm">
                      John Doe
                    </p>
                  </div>
                </div>
                <span className="flex items-center gap-2 text-xs text-gray-400">
                  <IconCalendarMonth className={"text-yellow-600"} size={15} />2
                  Feb 2024
                </span>
              </div>
              <NavLink
                to={"/"}
                className="font-semibold text-gray-700 truncate 2xl:text-xl text-md"
              >
                <p className="truncate">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Dolore praesentium ex distinctio ipsam! Inventore dolore, sed,
                  fugit nesciunt libero magnam quisquam distinctio accusantium
                  pariatur aspernatur voluptatibus consequuntur et dolores nisi.
                </p>
              </NavLink>
              <p className="text-xs text-gray-400 2xl:text-sm line-clamp-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam, dignissimos corrupti. Quis officiis molestiae ipsum
                maiores doloremque quo repellat molestias, illo commodi iste
                iusto autem facere doloribus porro, dignissimos vitae accusamus.
                Tempore magni consequatur saepe commodi soluta, voluptas quos
                officiis quaerat aut! Repudiandae rerum reprehenderit similique
                quo dolorum id vel!
              </p>
              <NavLink
                to={"/"}
                className="flex gap-3 text-gray-500 transition-all duration-300 ease-in-out hover:text-yellow-600"
              >
                Read more
                <IconArrowRight />
              </NavLink>
            </div>
            <div className="flex flex-col w-full gap-4 p-8 bg-white rounded-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Image
                      className={
                        "object-cover 2xl:h-8 h-6 w-6 2xl:w-8 rounded-full"
                      }
                      height={25}
                      width={25}
                    />
                    <p className="text-xs font-semibold text-gray-600 2xl:text-sm">
                      John Doe
                    </p>
                  </div>
                </div>
                <span className="flex items-center gap-2 text-xs text-gray-400">
                  <IconCalendarMonth className={"text-yellow-600"} size={15} />2
                  Feb 2024
                </span>
              </div>
              <NavLink
                to={"/"}
                className="font-semibold text-gray-700 truncate 2xl:text-xl text-md"
              >
                <p className="truncate">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Dolore praesentium ex distinctio ipsam! Inventore dolore, sed,
                  fugit nesciunt libero magnam quisquam distinctio accusantium
                  pariatur aspernatur voluptatibus consequuntur et dolores nisi.
                </p>
              </NavLink>
              <p className="text-xs text-gray-400 2xl:text-sm line-clamp-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam, dignissimos corrupti. Quis officiis molestiae ipsum
                maiores doloremque quo repellat molestias, illo commodi iste
                iusto autem facere doloribus porro, dignissimos vitae accusamus.
                Tempore magni consequatur saepe commodi soluta, voluptas quos
                officiis quaerat aut! Repudiandae rerum reprehenderit similique
                quo dolorum id vel!
              </p>
              <NavLink
                to={"/"}
                className="flex gap-3 text-gray-500 transition-all duration-300 ease-in-out hover:text-yellow-600"
              >
                Read more
                <IconArrowRight />
              </NavLink>
            </div>
            <div className="flex flex-col w-full gap-4 p-8 bg-white rounded-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Image
                      className={
                        "object-cover 2xl:h-8 h-6 w-6 2xl:w-8 rounded-full"
                      }
                      height={25}
                      width={25}
                    />
                    <p className="text-xs font-semibold text-gray-600 2xl:text-sm">
                      John Doe
                    </p>
                  </div>
                </div>
                <span className="flex items-center gap-2 text-xs text-gray-400">
                  <IconCalendarMonth className={"text-yellow-600"} size={15} />2
                  Feb 2024
                </span>
              </div>
              <NavLink
                to={"/"}
                className="font-semibold text-gray-700 truncate 2xl:text-xl text-md"
              >
                <p className="truncate">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Dolore praesentium ex distinctio ipsam! Inventore dolore, sed,
                  fugit nesciunt libero magnam quisquam distinctio accusantium
                  pariatur aspernatur voluptatibus consequuntur et dolores nisi.
                </p>
              </NavLink>
              <p className="text-xs text-gray-400 2xl:text-sm line-clamp-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam, dignissimos corrupti. Quis officiis molestiae ipsum
                maiores doloremque quo repellat molestias, illo commodi iste
                iusto autem facere doloribus porro, dignissimos vitae accusamus.
                Tempore magni consequatur saepe commodi soluta, voluptas quos
                officiis quaerat aut! Repudiandae rerum reprehenderit similique
                quo dolorum id vel!
              </p>
              <NavLink
                to={"/"}
                className="flex gap-3 text-gray-500 transition-all duration-300 ease-in-out hover:text-yellow-600"
              >
                Read more
                <IconArrowRight />
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
