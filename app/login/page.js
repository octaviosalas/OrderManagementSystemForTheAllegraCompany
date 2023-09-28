import React from "react";
import loginImage from "../images/log.jpg";

const Login = () => {
  return (
    <div style={{ height: "100vh" }}>
      <div className="flex h-full">
        <div
          class="flex flex-col justify-center m-auto h-100% h-full px-6 py-12 min-w-[25%]"
          // lg:px-8 2xl:h-full 2xl:w-[480px] xl:w-[460px] lg:w-[440px] md:w-[430px] sm:w-[420px] 2xl:ml-0 xl:ml-0 lg:ml-0 md:ml-0 sm:ml-40 xxs:ml-32 xxxs:ml-5
        >
          <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              class="mx-auto h-16 w-16"
              src="/allegra-store-logo.jpg"
              alt="Your Company"
            />
            <h2 class="mt-10 text-center 2xl:text-2xl xl:text-2xl lg:text-xl md:text-lg sm:text-md font-bold leading-9 tracking-tight text-gray-900">
              Iniciar Sesion
            </h2>
          </div>

          <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form class="space-y-6" action="#" method="POST">
              <div>
                <label
                  for="email"
                  class="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email
                </label>
                <div class="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autocomplete="email"
                    required
                    class="block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div class="flex items-center justify-between">
                  <label
                    for="password"
                    class="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Contraseña
                  </label>
                </div>

                <div class="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autocomplete="current-password"
                    required
                    class="block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  class="flex w-full justify-center  bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Ingresar
                </button>
              </div>

              <div class="text-sm mt-4 text-center">
                <a
                  href="#"
                  class="font-semibold text-indigo-600 hover:text-indigo-500 2xl:text-md xl:text-sm lg:text-sm md:text-xs sm:text-sm"
                >
                  Olvidaste tu contraseña?
                </a>
              </div>
            </form>
          </div>
        </div>

        <div className="h-100% flex items-center justify-center m-auto 2xl:w-[1400px] xl:w-[1350] hidden md:flex ">
          <img
            src={loginImage.src}
            className="object-fit:contain flex items-center max-w-[600px] w-full"
            // 2xl:w-[1350px] xl:w-[1300px] lg:w-[1200px] md:w-[1100px] sm:w-[900px]
            // 2xl:block xl:block md:block sm:hidden xxs:hidden xxxs:hidden
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
