import React from "react";

function Inputs({ formData, handleChange, errors }: any) {
  return (
    <>
      <div className="w-full flex-1 mb-4">
        <label htmlFor="name" className="w-full block">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-3 py-2.5 mt-1 border rounded-xl focus:ring-2 ${
            errors.name ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Name"
        />
        {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
      </div>

      <div className="flex gap-4">
        <div className="w-full flex-1 mb-4">
          <label htmlFor="username" className="w-full block">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={formData.username}
            onChange={handleChange}
            className={`w-full px-3 py-2.5 mt-1 border rounded-xl focus:ring-2 ${
              errors.username ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Username"
          />
          {errors.username && (
            <p className="text-red-500 text-xs">{errors.username}</p>
          )}
        </div>

        <div className="w-full flex-1 mb-4">
          <label htmlFor="email" className="w-full block">
            Gmail
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-3 py-2.5 mt-1 border rounded-xl focus:ring-2 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Gmail"
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email}</p>
          )}
        </div>
      </div>
      <div className="flex gap-4">
        <div className="w-full flex-1 mb-4">
          <label htmlFor="loginUrl" className="w-full block">
            Login URL
          </label>
          <input
            type="url"
            id="loginUrl"
            value={formData.loginUrl}
            onChange={handleChange}
            className={`w-full px-3 py-2.5 mt-1 border rounded-xl focus:ring-2 ${
              errors.loginUrl ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Login URL"
          />
          {errors.loginUrl && (
            <p className="text-red-500 text-xs">{errors.loginUrl}</p>
          )}
        </div>

        <div className="w-full flex-1 mb-4">
          <label htmlFor="pin" className="w-full block">
            Pin Code
          </label>
          <input
            type="number"
            id="pin"
            value={formData.pin}
            onChange={handleChange}
            className={`w-full px-3 py-2.5 mt-1 border rounded-xl focus:ring-2 ${
              errors.pin ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Pin Code"
          />
          {errors.pin && <p className="text-red-500 text-xs">{errors.pin}</p>}
        </div>
      </div>
      <div className="w-full flex-1 mb-4">
        <label htmlFor="password" className="w-full block">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          className={`w-full px-3 py-2.5 mt-1 border rounded-xl focus:ring-2 ${
            errors.password ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="********"
        />
        {errors.password && (
          <p className="text-red-500 text-xs">{errors.password}</p>
        )}
      </div>
    </>
  );
}

export default Inputs;
