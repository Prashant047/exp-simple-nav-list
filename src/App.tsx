import { ReactNode, useState } from "react"
import { BackpackIcon, DashboardIcon, ExclamationTriangleIcon,
  GearIcon, LaptopIcon, MarginIcon, 
  QuestionMarkCircledIcon 
} from '@radix-ui/react-icons';
import { motion } from 'framer-motion';

const navItems = [
  {label: 'Profile', icon:<LaptopIcon/>},
  {label: 'Dashboard', icon: <DashboardIcon/>},
  {label: 'NFT gallery', icon: <MarginIcon/>},
  {label: 'Ape Tool', icon: <BackpackIcon/>},
  {label: 'Settings', icon: <GearIcon/>},
  {label: 'Help', icon: <QuestionMarkCircledIcon/>},
  {label: 'Bug Report', icon:<ExclamationTriangleIcon/>},
]

export default function App() {
  const [selected, setSelected] = useState(0);
  const [pointerLocation, setPointerLocation] = useState(selected);
  

  return (
    <div className="max-w-sm mx-auto my-10 text-neutral-200">
      <Nav onMouseLeave={() => setPointerLocation(selected)}>
        {navItems.map(({label, icon}, i) => (
          <Nav.Item 
            key={i} 
            icon={icon}
            isSelected={selected === i}
            isPointed={pointerLocation === i}
            pointing = {() => setPointerLocation(i)}
            select={() => setSelected(i)}
          >
            {label}
          </Nav.Item>
        ))}
      </Nav>
    </div>
  )
}

function Nav({
  children,
  onMouseLeave
}:{
  children: ReactNode,
  onMouseLeave: () => void
}) {
  return (
    <nav onMouseLeave={onMouseLeave} className="bg-neutral-900 py-8 rounded-[20px] overflow-hidden">
      <ul className="flex flex-col">
        {children}
      </ul>
    </nav>
  )
}

Nav.Item = ({
  children,
  icon,
  pointing,
  select,
  isSelected,
  isPointed
}:{
  children: ReactNode,
  icon: ReactNode,
  pointing: () => void,
  select: () => void,
  isSelected: boolean,
  isPointed: boolean,
}) => {
  return (
    <li
      className={
        `relative flex items-center gap-4 pl-10 py-4 text-lg cursor-pointer
        group  data-[selected=true]:bg-green-800/20 transition
        `
      }
      onMouseOver={pointing}
      data-selected={isSelected}
      onClick={select}
    >
      {isPointed && (
        <motion.div
          layoutId="pointer"
          className="absolute top-0 left-3 flex items-center justify-center h-full w-[2px]"
        >
          <div className="w-full h-[50%] bg-green-600 rounded"/>
        </motion.div>
      )}
      <span>
        {icon}
      </span>
      <span className="group-hover:text-green-600 transition">
        {children}
      </span>
    </li>
  )
}