import { SetStateAction, useState } from 'react';

export default function Login() {
  return (
    <main className="flex justify-center items-center h-screen">
      <form className="w-1/3 p-2 bg-black rounded-lg shadow-md text-white">
        <h2 className="text-2xl font-bold mb-6 text-center">Entre seu login</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none"

          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none"

          />
        </div>
        <button
          type="submit"
          className="w-full bg-sky-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600"

        >
          Login
        </button>
      </form>
    </main>
  );
}
