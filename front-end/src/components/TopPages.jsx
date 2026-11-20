
import React from "react";

import { ExternalLink } from "lucide-react";

const TopPages = ({ data = [] }) => {

  return (
    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">

      {/* Header */}
      <div className="flex items-center justify-between mb-5">

        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Top Pages
          </h2>

          <p className="text-sm text-gray-500">
            Most visited pages on your website
          </p>
        </div>

      </div>

      {/* Table */}
      <div className="overflow-x-auto">

        <table className="w-full text-left">

          <thead>
            <tr className="border-b border-gray-200">

              <th className="py-3 text-xs font-semibold text-gray-500">
                PAGE
              </th>

              <th className="py-3 text-xs font-semibold text-gray-500">
                VIEWS
              </th>

              <th className="py-3 text-xs font-semibold text-gray-500">
                UNIQUE VISITORS
              </th>

              <th className="py-3 text-xs font-semibold text-gray-500">
                ACTION
              </th>

            </tr>
          </thead>

          <tbody>

            {data.length > 0 ? (

              data.map((page, index) => (

                <tr
                  key={page.page}
                  className="border-b border-gray-100 hover:bg-gray-50 transition"
                >

                  {/* Page */}
                  <td className="py-4">

                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        {page.page === "/" ? "Home Page" : page.page.replace("/", "").replaceAll("-", " ")}
                      </p>

                      <p className="text-xs text-gray-400">
                        {page.page}
                      </p>
                    </div>

                  </td>

                  {/* Views */}
                  <td className="py-4 text-sm font-medium text-gray-700">
                    {page.views.toLocaleString()}
                  </td>

                  {/* Unique Visitors */}
                  <td className="py-4 text-sm font-medium text-gray-700">
                    {page.uniqueVisitors.toLocaleString()}
                  </td>

                  {/* Action */}
                  <td className="py-4">

                    <button
                      title="View page"
                      onClick={() => window.open(page.page, "_blank")}
                      className="text-gray-400 hover:text-blue-600"
                    >
                      <ExternalLink size={17} />
                    </button>

                  </td>

                </tr>

              ))

            ) : (

              <tr>
                <td
                  colSpan="4"
                  className="py-8 text-center text-sm text-gray-500"
                >
                  No page data available
                </td>
              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default TopPages;
