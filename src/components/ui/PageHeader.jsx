import React from 'react';
import { Button } from './button';

export const PageHeader = ({
  title,
  description,
  icon,
  actions = [],
  className = ""
}) => {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-boldWhite p-5 w-full ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-bodyGray-900">{title}</h3>
          {description && <p className="text-sm text-bodyGray-500">{description}</p>}
        </div>
        <div className="flex flex-row justify-center items-center gap-4 p-2">
          {actions.map((action, index) => (
            <Button 
              key={index}
              onClick={action.onClick}
              className={action.className || "bg-primary-600 hover:bg-primary-700"}
            >
              {action.icon && <span className="mr-2">{action.icon}</span>}
              {action.label}
            </Button>
          ))}
          {icon && (
            <div className="rounded-lg bg-boldWhite">
              {icon}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;