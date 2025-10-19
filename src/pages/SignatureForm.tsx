import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import SignatureCanvas from 'react-signature-canvas'
import Card from '../components/Card'
import Button from '../components/Button'
import { getQueryParam } from '../lib/utils'
import { supabase } from '../lib/supabaseClient'

interface ToastProps {
  message: string
  type: 'success' | 'error'
  isVisible: boolean
}

const Toast: React.FC<ToastProps> = ({ message, type, isVisible }) => {
  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg text-white z-50 ${
        type === 'success' ? 'bg-success' : 'bg-error'
      }`}
    >
      {message}
    </motion.div>
  )
}

const SignatureForm: React.FC = () => {
  const [token, setToken] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toast, setToast] = useState<ToastProps>({ message: '', type: 'success', isVisible: false })
  const signatureRef = useRef<SignatureCanvas>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const tokenParam = getQueryParam('token')
    if (!tokenParam) {
      navigate('/confirmation?status=error')
      return
    }
    setToken(tokenParam)
  }, [navigate])

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type, isVisible: true })
    setTimeout(() => {
      setToast(prev => ({ ...prev, isVisible: false }))
    }, 3000)
  }

  const clearSignature = () => {
    signatureRef.current?.clear()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) {
      showToast('Veuillez saisir votre prénom et nom', 'error')
      return
    }

    if (signatureRef.current?.isEmpty()) {
      showToast('Veuillez signer avant d\'envoyer', 'error')
      return
    }

    setIsSubmitting(true)

    try {
      // Récupérer les données de signature en base64
      const signatureData = signatureRef.current?.getTrimmedCanvas().toDataURL('image/png')

      // Appeler l'Edge Function submit-signature
      const { data, error } = await supabase.functions.invoke('submit-signature', {
        body: JSON.stringify({
          token,
          name: name.trim(),
          signatureData
        }),
      })


      if (error) {
        console.error('Erreur lors de l\'envoi:', error)
        showToast('Erreur lors de l\'envoi de la signature', 'error')
      } else {
        console.log('Signature envoyée avec succès:', data)
        showToast('Signature envoyée avec succès !', 'success')
        // Rediriger vers la page de remerciement après un court délai
        setTimeout(() => {
          navigate('/thanks')
        }, 1500)
      }
    } catch (error) {
      console.error('Erreur inattendue:', error)
      showToast('Erreur inattendue lors de l\'envoi', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!token) {
    return (
      <div className="max-w-md mx-auto">
        <Card className="text-center">
          <p className="text-gray-600">Chargement...</p>
        </Card>
      </div>
    )
  }

  return (
    <>
      <motion.div
        className="max-w-md mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <motion.h1
            className="text-2xl font-bold text-gray-800 mb-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Émargement
          </motion.h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Prénom et Nom
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-colors"
                placeholder="Votre prénom et nom"
                required
                disabled={isSubmitting}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Signature
              </label>
              <div className="border-2 border-gray-300 rounded-lg p-4 bg-gray-50">
                <SignatureCanvas
                  ref={signatureRef}
                  canvasProps={{
                    width: 300,
                    height: 150,
                    className: 'border border-gray-300 rounded bg-white w-full h-full cursor-crosshair'
                  }}
                  backgroundColor="white"
                />
              </div>
              <Button
                type="button"
                variant="primary"
                onClick={clearSignature}
                className="mt-2 text-sm"
                disabled={isSubmitting}
              >
                Effacer la signature
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Envoi en cours...' : 'Envoyer ma signature'}
              </Button>
            </motion.div>
          </form>
        </Card>
      </motion.div>

      <Toast {...toast} />
    </>
  )
}

export default SignatureForm