import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Color } from "three";

export function Rings(){
    const itemsRef = useRef([])

    useFrame((state)=>{

        let elapsed = state.clock.getElapsedTime()

        for(let i=0; i< itemsRef.current.length; i++){
            let mesh = itemsRef.current[i]

            let z = (i-7) * 3.5 + ((elapsed * 0.4) % 3.5) * 2 //muove un rings per 7 unità, poi lo rimette nella posizione iniziale dando l'impressione che gli anelli vengano generati all'infinito, e si dissolvano dopo un tot distanza
            mesh.position.set(0, 0, -z)

            let dist = Math.abs(z)
            mesh.scale.set(1- dist * 0.04, 1-dist * 0.04, 1-dist * 0.04)

            let colorScale = 1

            if(dist>2){
                colorScale = 1 - (Math.min(dist, 12) -2) / 10
            }   

            colorScale *= 0.5

            if(i%2 === 1){
                mesh.material.emissive = new Color(6, 0.15, 0.7).multiplyScalar(colorScale)
            }
            else{
                mesh.material.emissive = new Color(0.1, 0.7, 3).multiplyScalar(colorScale)
            }
        }
    })

    return(
        <>  
            {/* questi 0 sono una array "fittizio" in modo che la funzione crei 14 elementi (anelli in questo caso) */}
            {[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,].map((v, i)=>(
                <mesh
                    castShadow
                    receiveShadow
                    position={[0, 0, 0]}
                    key={i}
                    ref={(el) => itemsRef.current[i] = el}
                >
                    <torusGeometry args={[3.35, 0.05, 16, 100]} />  {/* il primo valore è il radius dell'anello, il secondo il radius dei tubolari, terzo e quarto decidono quanti triangoli usare per disegnare questa geometria*/}
                    <meshStandardMaterial emissive={[0.5, 0.5, 0.5]} color={[0, 0, 0]} /> {/* Emissive è una proprietà che permette ad un materiale di agire come se fosse una fonte di luce. l'argomenti di emissive è il colore della luce, mentre color si riferisce al colore del materiale */} 
                </mesh>
            ))}
        </>
    )
}

