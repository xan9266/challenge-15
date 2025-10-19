import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Card from '../components/Card'
import Button from '../components/Button'
import { getQueryParam } from '../lib/utils'

interface StatusConfig {
  title: string
  message: string
  icon: string
  color: 'success' | 'error' | 'primary'
}

const Confirmation: React.FC = () => {
  const [status, setStatus] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const statusParam = getQueryParam('status')
    setStatus(statusParam)
    setIsLoading(false)
  }, [])

  const getStatusConfig = (status: string | null): StatusConfig => {
    switch (status) {
      case 'confirmed':
        return {
          title: 'Présence confirmée',
          message: 'Votre présence a été confirmée avec succès. Merci !',
          icon: '✅',
          color: 'success'
        }
      case 'declined':
        return {
          title: 'Présence annulée',
          message: 'Votre présence a été annulée. À bientôt !',
          icon: '❌',
          color: 'error'
        }
      case 'already-confirmed':
        return {
          title: 'Déjà confirmé',
          message: 'Votre présence était déjà confirmée.',
          icon: '🟩',
          color: 'success'
        }
      case 'already-declined':
        return {
          title: 'Déjà refusé',
          message: 'Votre présence était déjà refusée.',
          icon: '🟥',
          color: 'error'
        }
      case 'error':
        return {
          title: 'Erreur',
          message: 'Une erreur s\'est produite lors du traitement de votre demande.',
          icon: '⚠️',
          color: 'error'
        }
      default:
        return {
          title: 'Statut inconnu',
          message: 'Le statut de votre demande est inconnu.',
          icon: '❓',
          color: 'primary'
        }
    }
  }

  if (isLoading) {
    return (
      <div className="max-w-md mx-auto">
        <Card className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-gray-600">Chargement...</p>
        </Card>
      </div>
    )
  }

  const config = getStatusConfig(status)

  return (
    <motion.div
      className="max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="text-6xl mb-6"
        >
          {config.icon}
        </motion.div>

        <motion.h1
          className="text-2xl font-bold text-gray-800 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {config.title}
        </motion.h1>

        <motion.p
          className="text-gray-600 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {config.message}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button variant={config.color} className="w-full">
            Continuer
          </Button>
        </motion.div>
      </Card>
    </motion.div>
  )
}

export default Confirmation