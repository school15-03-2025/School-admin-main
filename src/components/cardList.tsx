import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

interface CardListItem {
  name: string;
  msg: string;
  value: string | number;
  time: string;
}

interface CardListProps {
  title: string;
  counts?: number;
  data: CardListItem[];
  type: string;
  icon: IconDefinition;
  href: string;
}

// components/CardList.tsx
const CardList = ({ title, counts, data, type, icon, href }: CardListProps) => {
  return (
    <div className="card bg-white rounded-xl p-4 shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg text-gray-900">{title}</h3>
        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
          {counts ?? 0} new
        </span>
      </div>

      {data.length > 0 ? (
        <ul className="space-y-3">
          {data.map((item, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-3 bg-gray-50 border rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex gap-3 items-center">
                <FontAwesomeIcon
                  icon={icon}
                  className="w-5 h-5 text-gray-600"
                />
                <div className="ml-3 space-y-1">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {item.name}
                  </p>
                  <p className="text-sm text-gray-500 truncate">{item.msg}</p>
                </div>
              </div>
              <div className="space-y-1 text-right font-medium text-gray-900">
                <time className="text-xs text-gray-400">{item.time}</time>
                <p>{item.value}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center py-6">
          <p className="text-gray-500">No {type} available</p>
        </div>
      )}

      <div className="mt-4 text-right">
        <Link href={href}>
          <span className="text-primary hover:text-primary-dark text-sm font-medium inline-flex items-center">
            View all {type}
            <FontAwesomeIcon icon={faAngleRight} className="ml-1 w-4 h-4" />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default CardList;
