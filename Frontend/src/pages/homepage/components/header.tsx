import { useEffect } from "react"
import { useMatches } from "react-router-dom"
import styled from "styled-components"
import { headerItems } from "../constants/header-items"

export function Header() {    
  let location = useMatches();

  useEffect(() => {
    console.log(location);
  }, [location]);
  
  return (
    <HeaderStyle>
      <Seletor>
        {
          headerItems.map((item, index) => {
            return (
              <div key={index} style={{ display: "flex", alignItems: "center", gap: ".625rem" }}>
                  <a href={item.path} className={"item " + (window.location.pathname === item.path ? "active" : "")}>
                    {item.icon}
                    <p>{item.name}</p>
                  </a>
              </div>
            )
          })
        }
      </Seletor>
    </HeaderStyle>
  )
}

const HeaderStyle = styled.div`
  height: 5dvh;
  width: 100vw;
  background-color: white;
  box-shadow: .0625rem 0rem .3125rem rgba(0, 0, 0, 0.05);
  display: flex;
  padding: 1.25rem;
  align-items: center;
  justify-content: space-around;
`

const Seletor = styled.div`
  display: flex;
  padding: 1.25rem;
  align-items: center;
  justify-content: space-around;

    .item {
    display: flex;
    align-items: center;
    padding: 2rem;
    gap: .625rem;
    cursor: pointer;
    border: solid .0625rem transparent;
  }

  .item p {
    color: rgba(0, 0, 0, 0.7);
    font-weight: 500;
    text-decoration: underline;
    text-decoration-color: transparent;
    transition: all 0.1s;
  }

  .item:hover p {
    text-decoration: underline;
    text-decoration-color: black;
  }

  .item svg {
    color: rgba(0, 0, 0, 0.7);
  }

  .active {
    background-color: rgba(var(--main-color), 0.1);
    border-radius: .3125rem;
    border: solid .0625rem rgba(var(--main-color), 0.2);
  }

  .active p {
    color: rgba(0, 0, 0, 1);
  }

  .active svg {
    color: rgba(0, 0, 0, 1);
  }
`