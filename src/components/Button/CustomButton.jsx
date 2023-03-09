import { Button } from "antd";
import './CustomButton.css'

const CustomButton = ({className,onClick,icon,children}) =>{
    return <Button className={`customBtn-${className}`} icon={icon} onClick={onClick}>{children}</Button>
}

export default CustomButton;
