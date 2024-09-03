'use client'

import { useState, useEffect } from 'react'
import { callRing } from '@/app/actions'
import { Input } from "@/components/ui/input"
import { User, Bell } from "lucide-react"

export function Timbre() {
  const [name, setName] = useState('')
  const [isRinging, setIsRinging] = useState(false)
  const [canRing, setCanRing] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  useEffect(() => {
    setCanRing(name.trim().length > 0)
  }, [name])

  useEffect(() => {
    if (status !== 'idle') {
      const timer = setTimeout(() => {
        setStatus('idle')
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [status])

  const handleButtonClick = async () => {
    if (canRing && !isRinging) {
      setIsRinging(true)
      setIsPressed(true)
      setTimeout(() => setIsPressed(false), 200)
      try {
        const response = await callRing(name)
        setStatus('success')
       
      } catch (error) {
        setStatus('error')
      } finally {
        setIsRinging(false)
      }
    }
  }

  const getButtonColor = () => {
    switch (status) {
      case 'success':
        return 'from-green-500 to-green-600 group-hover:from-green-400 group-hover:to-green-500'
      case 'error':
        return 'from-red-500 to-red-600 group-hover:from-red-400 group-hover:to-red-500'
      default:
        return isRinging 
          ? 'from-blue-400 to-blue-500' 
          : canRing 
            ? 'from-blue-500 to-blue-600 group-hover:from-blue-400 group-hover:to-blue-500' 
            : 'from-gray-500 to-gray-600'
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[url('/brick-wall-background.jpg')] bg-cover">
      <div className="w-full max-w-sm mx-4">
        <div 
          className="relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg overflow-hidden border-8 border-gray-700 transition-all duration-500 ease-in-out"
          style={{
            boxShadow: '0 20px 25px -5px rgba(0,0,0,0.5), 0 10px 10px -5px rgba(0,0,0,0.4), inset 0 -2px 10px rgba(0,0,0,0.3)',
            transform: `perspective(1000px) rotateX(5deg) ${isHovering ? 'scale(1.02)' : 'scale(1)'}`,
          }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Metallic frame effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800 opacity-50 mix-blend-overlay"></div>
          
          {/* Light reflection effect */}
          <div 
            className="absolute inset-0 bg-gradient-to-tr from-transparent to-white opacity-10 transition-opacity duration-500 ease-in-out"
            style={{ opacity: isHovering ? 0.2 : 0.1 }}
          ></div>
          
          {/* Doorbell panel header */}
          <div className="relative bg-gradient-to-r from-gray-800 to-gray-900 text-white p-4 text-center shadow-md">
            <h1 className="text-2xl font-bold" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.6)' }}>Timbre</h1>
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-30"></div>
          </div>
          
          {/* Name input and Doorbell button */}
          <div className="relative p-6 bg-gradient-to-b from-gray-700 to-gray-800">
            <div className="mb-6">
              <div className="relative">
                <Input
                  id="name"
                  type="text"
                  placeholder="Ingrese su nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 text-lg border-2 border-gray-600 rounded-md focus:border-blue-400 focus:ring focus:ring-blue-300 bg-gray-800 text-white shadow-inner transition-all duration-300 ease-in-out"
                  style={{ boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)' }}
                />
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>
            </div>
            
            {/* Ultra Professional Doorbell button with enhanced effects and status states */}
            <div className="flex justify-center items-center mt-6">
              <button 
                onClick={handleButtonClick}
                disabled={!canRing || isRinging}
                onMouseDown={() => setIsPressed(true)}
                onMouseUp={() => setIsPressed(false)}
                onMouseLeave={() => setIsPressed(false)}
                className={`w-36 h-36 rounded-full transition-all duration-300 ease-in-out 
                  ${!canRing ? 'opacity-70 cursor-not-allowed' : 'hover:scale-105'}
                  ${isRinging ? 'animate-pulse' : ''}
                  focus:outline-none focus:ring-4 focus:ring-blue-300
                  relative overflow-hidden group`}
                style={{
                  background: 'linear-gradient(145deg, #2c2c2c, #1a1a1a)',
                  boxShadow: isPressed 
                    ? 'inset 6px 6px 12px #0d0d0d, inset -6px -6px 12px #333333, 0 0 15px rgba(0,0,0,0.5)' 
                    : '10px 10px 20px #0d0d0d, -10px -10px 20px #333333, inset 0 2px 4px rgba(255,255,255,0.1)',
                  transform: isPressed ? 'scale(0.95)' : 'scale(1)',
                }}
              >
                {/* Outer ring with dynamic lighting */}
                <div 
                  className="absolute inset-2 rounded-full bg-gradient-to-b from-gray-700 to-gray-900 opacity-50 transition-opacity duration-300"
                  style={{ opacity: isPressed ? 0.7 : 0.5 }}
                ></div>
                
                {/* Inner button with enhanced effects and status states */}
                <div 
                  className={`absolute inset-4 rounded-full transition-all duration-300
                    bg-gradient-to-b ${getButtonColor()}
                    shadow-[inset_0_2px_6px_0_rgba(0,0,0,0.3),0_1px_2px_0_rgba(255,255,255,0.1)]`}
                  style={{
                    transform: isPressed ? 'scale(0.9)' : 'scale(1)',
                    boxShadow: isPressed 
                      ? 'inset 0 6px 12px rgba(0,0,0,0.5)' 
                      : 'inset 0 -6px 12px rgba(255,255,255,0.2), inset 0 6px 12px rgba(0,0,0,0.2)',
                  }}
                >
                  <div className="absolute inset-2 rounded-full bg-gradient-to-b from-transparent to-black opacity-30"></div>
                  
                  {/* Dynamic glow effect */}
                  <div 
                    className={`absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 blur-md
                      ${status === 'success' ? 'bg-green-400' : status === 'error' ? 'bg-red-400' : 'bg-blue-400'}`}
                    style={{ opacity: (isHovering && canRing) || status !== 'idle' ? 0.4 : 0 }}
                  ></div>
                </div>
                
                {/* Bell icon with enhanced effects */}
                <Bell
                  className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                    w-16 h-16 text-white z-10 transition-all duration-300 ease-in-out
                    ${isRinging ? 'animate-[wiggle_0.3s_ease-in-out_infinite]' : canRing ? 'group-hover:scale-110' : ''}`}
                  style={{ 
                    filter: `drop-shadow(0px 2px 2px rgba(0,0,0,0.5)) ${isHovering && canRing ? 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.8))' : ''}`,
                    transform: `translate(-50%, -50%) ${isPressed ? 'scale(0.9)' : 'scale(1)'}`,
                  }}
                />
                
                {/* Enhanced reflection effect */}
                <div 
                  className="absolute inset-0 rounded-full bg-gradient-to-b from-white to-transparent opacity-10 transition-opacity duration-300"
                  style={{ opacity: isPressed ? 0.05 : 0.15 }}
                ></div>

                {/* Ripple effect on click */}
                {isPressed && (
                  <div className="absolute inset-0 rounded-full animate-ripple bg-white opacity-30"></div>
                )}
              </button>
            </div>
          </div>
          
          {/* Status message */}
          <div className="relative p-4 bg-gradient-to-b from-gray-800 to-gray-900 text-center border-t border-gray-600">
            <p className="text-sm text-gray-300 font-medium" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>
              {!canRing && 'Ingrese su nombre para tocar el timbre'}
              {canRing && status === 'idle' && !isRinging && 'Presione el botón para anunciar su visita'}
              {isRinging && 'Anunciando su visita...'}
              {status === 'success' && 'Visita anunciada exitosamente'}
              {status === 'error' && 'Error al anunciar. Intente de nuevo.'}
            </p>
          </div>

          {/* Screws with subtle rotation on hover */}
          {[
            'top-2 left-2', 'top-2 right-2', 'bottom-2 left-2', 'bottom-2 right-2'
          ].map((position, index) => (
            <div 
              key={index}
              className={`absolute ${position} w-3 h-3 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 shadow-inner transition-transform duration-300 ease-in-out`}
              style={{ 
                transform: isHovering ? `rotate(${45 * (index + 1)}deg)` : 'rotate(0deg)',
                boxShadow: 'inset -1px -1px 2px rgba(255,255,255,0.2), inset 1px 1px 2px rgba(0,0,0,0.3)'
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  )
}