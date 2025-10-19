import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Card from '../components/Card'
import Button from '../components/Button'

const Thanks: React.FC = () => {
  const navigate = useNavigate()

  return (
    <motion.div
      className="max-w-md mx-auto"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
    >
      <Card className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="text-6xl mb-6"
        >
          🎉
        </motion.div>

        <motion.h1
          className="text-3xl font-bold text-gray-800 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Merci !
        </motion.h1>

        <motion.p
          className="text-lg text-gray-600 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Votre émargement a été enregistré avec succès.
          <br />
          Merci pour votre participation !
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-3"
        >
          <Button
            variant="primary"
            className="w-full"
            onClick={() => navigate('/confirmation')}
          >
            Retour à l'accueil
          </Button>

          <Button
            variant="primary"
            className="w-full"
            onClick={() => window.location.reload()}
          >
            Nouvelle signature
          </Button>
        </motion.div>
      </Card>
    </motion.div>
  )
}

export default Thanks