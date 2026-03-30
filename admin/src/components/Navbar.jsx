import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import {navbarStyles as ns} from '../assets/dummyStyles';
import logoImg from "../assets/logo.png";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Calendar, Grid, Home, List, Menu, PlusSquare, UserPlus, Users, X } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navInnerRef = useRef(null);
  const indicatorRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const clerkEnabled = Boolean(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);
  const isSignedIn = false;

  // sliding active indicator logic

    const moveIndicator = useCallback(() => {
    const container = navInnerRef.current;
    const ind = indicatorRef.current;
    if (!container || !ind) return;

    const active = container.querySelector(".nav-item.active");
    if (!active) {
      ind.style.opacity = "0";
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const activeRect = active.getBoundingClientRect();

    const left = activeRect.left - containerRect.left + container.scrollLeft;
    const width = activeRect.width;

    ind.style.transform = `translateX(${left}px)`;
    ind.style.width = `${width}px`;
    ind.style.opacity = "1";
  }, []);

  // it will be moving in 0.12 seconds

  useLayoutEffect(() => {
    moveIndicator();
    const t = setTimeout(() => {
      moveIndicator();
    }, 120);
    return () => clearTimeout(t);
  }, [location.pathname, moveIndicator]);

  // it will help in scrolling on x-axis
  useEffect(() => {
    const container = navInnerRef.current;
    if (!container) return;

    const onScroll = () => {
      moveIndicator();
    };
    container.addEventListener("scroll", onScroll, { passive: true });

    const ro = new ResizeObserver(() => {
      moveIndicator();
    });
    ro.observe(container);
    if (container.parentElement) ro.observe(container.parentElement);

    window.addEventListener("resize", moveIndicator);

    moveIndicator();

    return () => {
      container.removeEventListener("scroll", onScroll);
      ro.disconnect();
      window.removeEventListener("resize", moveIndicator);
    };
  }, [moveIndicator]);

  // it will be toggle the  mobile menu ie: close when we click on escape key
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && open) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // to open login flow
const handleOpenSignIn = () => {
  if(!clerkEnabled) {
      navigate("/h");
    return;
  }
  // If Clerk is configured this route can be replaced with openSignIn.
  navigate("/h");
};

// to signout 
const handleSignOut = async () => {
  navigate("/");
};


  return (
    <header className={ns.header}>
      <nav className={ns.navContainer}>
        <div className={ns.flexContainer}>
          <div className={ns.logoContainer}>
            <img src={logoImg} alt="logo" className={ns.logoImage}/>

            <Link to='/h' >
              <div className={ns.logoLink}>MediCare</div>
              <div className={ns.logoSubtext}>HealthCare Solutions</div>
            </Link>
          </div>
          
          {/* center navigation */}
          <div className={ns.centerNavContainer}>
            <div className={ns.glowEffect}>
              <div className={ns.centerNavInner}>
                <div ref={navInnerRef} tabIndex={0} className={ns.centerNavScrollContainer} style={{
                  WebkitOverflowScrolling: "touch"
                }}>
                  <CenterNavItem to="/h" label="Dashboard"/>
                  <CenterNavItem to="/add" label="Add Doctor"/>
                  <CenterNavItem to="/list" label="List Doctors"/>
                  <CenterNavItem to="/appointments" label="Appointments"/>
                  <CenterNavItem to="/service-dashboard" label="Service Dashboard"/>
                  <CenterNavItem to="/add-service" label="Add Service"/>
                  <CenterNavItem to="/list-service" label="List Services"/>
                  <CenterNavItem to="/service-appointments" label="Service Appointments"/>
                </div>
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className={ns.rightContainer}>
            {isSignedIn ? (
              <button onClick={ handleSignOut } className={ns.signOutButton + " " + ns.cursorPointer}>
                Sign Out
              </button>
            ):(
              <div className="flex items-center gap-2">
                <button onClick={ handleOpenSignIn } className={ns.loginButton + " " + ns.cursorPointer}>
                  Login
                </button>
              </div>
            )}
            
            {/* Mobile toggle */}
            <button onClick={() => setOpen((v) => !v)} className={ns.mobileMenuButton}>
              {open ? <X size={18}/> : <Menu size={18}/>}
            </button>
          </div>
        </div>

        {/* Mobile navigation */}
        {open && (
          <div className={ns.mobileOverlay} onClick={() => setOpen(false)}/>
        )}

        {open && (
          <div className={ns.mobileMenuContainer} id="mobile-menu">
            <div className={ns.mobileMenuInner}>
              <MobileItem
                to="/h"
                label="Dashboard"
                icon={<Home size={16} />}
                onClick={() => setOpen(false)}
              />

              <MobileItem
                to="/add"
                label="Add Doctor"
                icon={<UserPlus size={16} />}
                onClick={() => setOpen(false)}
              />
              <MobileItem
                to="/list"
                label="List Doctors"
                icon={<Users size={16} />}
                onClick={() => setOpen(false)}
              />
              <MobileItem
                to="/appointments"
                label="Appointments"
                icon={<Calendar size={16} />}
                onClick={() => setOpen(false)}
              />

              <MobileItem
                to="/service-dashboard"
                label="Service Dashboard"
                icon={<Grid size={16} />}
                onClick={() => setOpen(false)}
              />
              <MobileItem
                to="/add-service"
                label="Add Service"
                icon={<PlusSquare size={16} />}
                onClick={() => setOpen(false)}
              />
              <MobileItem
                to="/list-service"
                label="List Services"
                icon={<List size={16} />}
                onClick={() => setOpen(false)}
              />
              <MobileItem
                to="/service-appointments"
                label="Service Appointments"
                icon={<Calendar size={16} />}
                onClick={() => setOpen(false)}
              />
              <div className={ns.mobileAuthContainer}>
                {isSignedIn ? (
                  <button onClick={() => {
                    handleSignOut();
                    setOpen(false);
                  }} className={ns.mobileSignOutButton}>
                    Sign Out
                  </button>
                ) : (
                  <div className="space-y-2">
                    <button onClick={() =>{
                      handleOpenSignIn();
                      setOpen(false);
                    }} className={ns.mobileLoginButton + " " + ns.cursorPointer}>
                      Login
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;

function CenterNavItem({ to, icon, label }) {
  return (
    <NavLink to={to} end className={({isActive}) => `nav-item ${
    isActive ? "active" : ""} ${ns.centerNavItemBase} ${
      isActive ? ns.centerNavItemActive : ns.centerNavItemInactive
    }`}>
      <span>{icon}</span>
      <span className="font-medium">{label}</span>
    </NavLink>
  );
}

function MobileItem({ to, icon, label, onClick }) {
  return (
    <NavLink to={to} onClick={onClick} className={({isActive}) => 
    `${ns.mobileItemBase} ${
      isActive ? ns.mobileItemActive : ns.mobileItemInactive
    }`}>
      {icon}
      <span className="font-medium text-sm">{label}</span>
    </NavLink>
  )
}