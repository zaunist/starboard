// components/Card.tsx
import React from "react";

interface CardProps {
  title: string;
  description: string;
  imageUrl?: string;
  repositoryUrl: string;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  return (
    <div ref={ref}>
      <a
        href={props.repositoryUrl}
        className="max-w-sm rounded overflow-hidden shadow-lg m-4 block"
        target="_blank"
        rel="noopener noreferrer"
      >
        {props.imageUrl && (
          <img className="w-full" src={props.imageUrl} alt={props.title} />
        )}
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{props.title}</div>
          <p className="text-gray-700 text-base">{props.description}</p>
        </div>
      </a>
    </div>
  );
});

export default Card;
