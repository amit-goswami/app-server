import Content from '../../models/Content'
import { Request, Response } from 'express'
import { Logger } from '../../logger'
import { UPDATE_TYPE } from '../../types/shared.interface'
import { AppContentType } from '../../types/content.interface'

class AppContentController implements AppContentType.IContentController {
  public async getAllContents(_req: Request, res: Response): Promise<void> {
    try {
      const contents = await Content.find({ content: { $exists: true } })
      res.json({
        contents,
        message: 'Success',
        status: '200'
      })
    } catch (error) {
      Logger.error('Error fetching contents:', error)
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  public async updateContent(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params
      const { content, updateType } = req.body

      const isAddType = updateType === UPDATE_TYPE.ADD ? true : false

      const updatedContent = await Content.findOneAndUpdate(
        { contentId: id },
        {
          $inc: {
            addCount: isAddType ? 1 : 0,
            updateCount: isAddType ? 0 : 1
          },
          content
        },
        { new: true, upsert: true }
      )

      if (!updatedContent) {
        const newContent = new Content({
          contentId: id,
          content,
          addCount: isAddType ? 1 : 0,
          updateCount: isAddType ? 0 : 1
        })

        await newContent.save()

        res.status(201).json({
          newContent,
          message: 'Content added successfully',
          status: '201'
        })
      }

      res.json(updatedContent)
    } catch (error) {
      Logger.error('Error updating content:', error)
      res.status(500).json({ message: 'Internal server error' })
    }
  }
}

export const ContentController = new AppContentController()
